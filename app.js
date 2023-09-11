const express = require('express');
const moment = require('moment-timezone');
const app = express();
const port = process.env.PORT || 3000;

app.get('/api', (req, res) => {
    const slack_name = req.query.slack_name;
    const track = req.query.track;

    if (!track) {
        return res.status(400).json({ error: 'track parameter is required' });
    }

    const current_day = getCurrentDay();
    const utc_time = getCurrentUtcTime().toISOString();
    const github_file_url = 'https://github.com/Rezi452/backend1.git';
    const github_repo_url = 'https://github.com/Rezi452/backend1';

    const response_data = {
        slack_name,
        current_day,
        utc_time,
        track,
        github_file_url,
        github_repo_url,
        status_code: 200
    };

    res.json(response_data);
});

function getCurrentDay() {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const now = new Date();
    return daysOfWeek[now.getUTCDay()];
}

function getCurrentUtcTime() {
    const now = new Date();
    return new Date(now.getTime() + now.getTimezoneOffset() * 60000);
}

app.listen(port, () => {
    // console.log(`Server is running on port ${port}`);
});
