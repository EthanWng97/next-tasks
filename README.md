<h1 align="center">Next Tasks</h1>

[![CodeFactor](https://www.codefactor.io/repository/github/navepnow/next-tasks/badge)](https://www.codefactor.io/repository/github/navepnow/next-tasks)
[![DeepScan grade](https://deepscan.io/api/teams/20904/projects/24382/branches/749531/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=20904&pid=24382&bid=749531)
## Introduction

Next Tasks is a project that allows you to define and run tasks using Next.js API routes and GitHub Actions. With this project, you can automate a variety of tasks, such as:

- Sending RSS feeds to Kindle
- Pushing LeetCode daily questions to a Telegram channel
- Running database queries and updating records
- Generating reports and sending them via email
- And much more!

## Roadmap

- [ ] Store RSS link at Redis instead of env
  - Update configuration to use Redis for storing RSS links
  - Refactor code to retrieve RSS links from Redis

- [ ] Handle errors and return messages for LeetCode daily question
  - Implement error handling for failed requests to LeetCode API
  - Return informative error messages to users

- [ ] Customize front page
  - Create a custom design for the front page
  - Add additional features and information to the front page

- [ ] Use UI interface to control subscribed RSS links
  - Develop a user interface for managing RSS subscriptions
  - Allow users to add, edit, and delete RSS links through the interface

## Getting Started

To get started with Next Tasks, follow these steps:

1. Clone the repository
2. Install the dependencies using `npm install`
3. Configure the API routes to perform the desired tasks
4. Set up the GitHub Actions workflow to trigger the API routes
5. Run the workflow to execute the tasks

## Contributing

If you'd like to contribute to Next Tasks, please follow these steps:

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

## License

Next Task is licensed under the MIT License. See the LICENSE file for more information.

## Contact

If you have any questions or comments about Next Tasks, please feel free to contact us at <yifwang@duck.com>. We'd love to hear from you!

Copyright © 2023 [Evan](https://github.com/NavePnow).
This project is [MIT](https://github.com/NavePnow/Profiles/blob/master/LICENSE) licensed.

