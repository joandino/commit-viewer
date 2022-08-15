import React, { Fragment, useEffect, useState } from 'react';
import axios from "axios";

export default function Commits() {
    const [commits, setCommits] = useState([]);

    useEffect(() => {
        getCommits();
    }, [])

    useEffect(() => {
        renderCommits();
    }, [commits]);

    const getCommits = async () => {
        const res = await axios.get('https://api.github.com/repos/joandino/commit-viewer/commits', {
            headers: {
                'Authorization': `token ${process.env.REACT_APP_GITHUB_PERSONAL_TOKEN}` 
            }
        });

        if(res.data.length > 0) {
            setCommits(commits => [...commits, ...res.data]);
        }
    }

    const renderCommits = () => {
        console.log(commits);
        const mappedCommits = commits.map((item, index) => (
            <li key={index}>
                <span>{item.commit.message}</span>
            </li>
        ));

        return mappedCommits;
    };

    return (
        <Fragment>
            <ul>{renderCommits()}</ul>
        </Fragment>
    )
}