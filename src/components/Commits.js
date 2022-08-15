import React, { Fragment, useEffect, useState } from 'react';
import axios from "axios";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import CommitIcon from '@mui/icons-material/Commit';
const _ = require("underscore");

export default function Commits() {
    const [commits, setCommits] = useState([]);

    useEffect(() => {
        getCommits();
    }, [])

    useEffect(() => {
        renderCommits();
    }, [commits]);

    const getCommits = async () => {
        setCommits([]);

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
        const alldates = _.groupBy(commits, function(obj) {
            const date = new Date(obj.commit.author.date);
            return (date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear();
        });

        const mappedCommits = Object.entries(alldates)
        .map(([key, value]) => (
            <Step active={true} key={key}>
                <StepLabel StepIconComponent={CommitIcon}>
                    {`Commits on ${new Date(key).toDateString()}`}
                </StepLabel>
                <StepContent>
                    {value.map((item, index) => (
                        <Card sx={{ maxWidth: "100%" }} key={index}>
                            <CardHeader
                                avatar={
                                    <Avatar src={item.author.avatar_url} />
                                }
                                title={item.commit.message}
                                subheader={item.commit.author.name}
                            />
                        </Card>
                    ))}
                </StepContent>
            </Step>
        ));

        return mappedCommits;
    };

    return (
        <Fragment>
            <Box className="container">
                <Stepper orientation="vertical">
                    {renderCommits()}
                </Stepper>
            </Box>
        </Fragment>
    )
}