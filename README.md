# michelle-lo-dev-space

BrainStation Capstone Project

**Dev Space**

## Getting Started

To get started with Dev Space, follow these steps:

### 1. Clone the Repository

Clone the repository to your local machine using the following command:

bash
git clone https://github.com/mich-elle-lo/michelle-lo-dev-space.git
cd dev-space
npm i
npm start

**_Note: If you intend to run the iPhone simulator, ensure you have Xcode installed on your system._**
**_IF YOU ARE PLANNING ON USING EXPO ON YOUR PHONE TO EMULATE THE APP YOU WILL HAVE TO HAVE YOUR NETWORK IP ADDRESS, IF NOT THEN CHANGE THE VARIABLE IN THE API CALLS TO BASE_URL_**

**Overview**

Dev Space is a social media platform designed specifically for software developers and engineers. This app provides a unique space where like-minded individuals can connects, share their stories, experiences, knowledge, and life as a developer.

By focusing on the development community, Dev Space aims to foster a supportive, informative, and collaborative environment.

**Problem**

The landscape of current social media platforms lack a dedicated space just for developers. This platform will promote professional growth, knowledge exchange, and personal connections within the tech community. Many developers seek advice, mentorship or even a sense of belonging - Dev Space will help bridge that gap. It is an environment where developers can share, learn and grow together!

**User Profile**

Dev Space is designed for software developers and engineers at any stage of their education or career - from beginners seeking advice and guidance to experienced professionals sharing insights. Users can share code snippets, development hurdles, project achievements and even funny memes! Any content about development is welcome!

**Features**

Personal Profiles: Users can create profiles, sharing their skills, projects and interest.
Feed: A personalized feed of post, articles and whatever fellow users feel to share.
Knowledge Sharing: Functionality to share code snippets, tutorials and such.
Job Board: A dedicated space for sharing and discovering job opportunities.
User Profile: Profile for each user with the ability to edit.

** Tech Stack**

Front-end: React Native/EXPO for cross-platform mobile app development.
Back-end: Node.js with Express for the server.
Database: Knex.
Authentication: JWT.
APIs: Daily.Dev, React Native and Expo API's.

**Sitemap**

Login: Get user info or ask to create an account.
Register: Create an account.
Home: Show highlights and feed.
Profile: User profile - photo, bio, interest.
Jobs: Browse and post job opportunities.

**Data**

User Data: Profiles, post, connections
Content Data: Post, discussions, code snippets.
Job Listings: Details of job listings.

**Endpoints**

/users: GET (get profiles), POST (create new user).
/posts: GET (feed post), POST (create a post).
/jobs: GET (list of jobs), POST (post job).

**Auth**

Employing JWT (JSON Web Tokens) for authentication.

**Roadmap**

Setup project structure, basic framework and UI components.
Implement authentication, user profiles, messaging and the main feed.
Develop job postings page.
Finalize and connect all pages/features. Conduct testing. Refine what needs to be refined.

**Nice-to-haves**

Will attempt light/dark mode.
A networking/events page.
Messaging: Chat with fellow users.
