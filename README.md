# GitHub Repositories Listing Page

Design a website that displays the public GitHub repositories belonging to any specific user.

## Description

This project is a web page designed to showcase public GitHub repositories for a specified user. It utilizes the GitHub REST API to fetch repository information and presents it in a paginated and searchable format.

## LIVE Demo - [Click here](https://khushitayal.github.io/fyle_githubRepo/)

### References & Requirements

- [GitHub REST API Documentation](https://docs.github.com/en/rest/reference)
- Each repository can have multiple topics. View the [example image](screenshots/repository-topic.png) for reference.
- Pagination is server-side, displaying 10 repositories per page by default, with an option to choose up to 100 repositories per page.
- Loading indicators are shown during API calls. A search bar is provided to filter repositories.

## Usage

1. Enter a valid GitHub username in the input field.
2. Click the "Load Repositories" button to fetch and display the repositories.
3. Explore paginated repositories with topics.
4. Optionally, use the search bar to filter repositories.

## Features

- Paginated repositories with server-side pagination.
- Loading indicators during API calls.
- Search bar for repository filtering.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/KhushiTayal/fyle_githubRepo.git
