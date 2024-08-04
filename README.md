# SaberQuest - Frontend 🖥️

The new frontend for [SaberQuest](https://saberquest.xyz).

## Database/Backend 🗄️
- [Backend Service](https://github.com/Saber-Quest/SaberQuest-backend)

# Want to help?

> [!NOTE]
> Contributions are always appreciated!
> 
> If you want to contribute, fork the repository and make a pull request.  
> The name of the pull request should be `[Username]/[Feature]`
>
> Every pull request will be reviewed by a maintainer, and if it is accepted, it will be merged into the next-branch for testing.  
> If it passes tests and is stable, it will be merged into the main branch, otherwise a maintainer will contact you to fix the issues.
>
> This can take **3-4 days**, so _please_ be patient, as We're all working on this in our free time. Thank you!
> 
> If you want to contribute to the backend, go to the [Backend Repository](https://github.com/Saber-Quest/SaberQuest-backend)
#
## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn
```

Setup the environment variables: [`.env.example`](.env.example)

> [!WARNING]
> If you do **not** change the secret and salt, the application will use default values. (`devsecret` and `devsalt`)  
> **Please change them to avoid cookies being stolen and reversed!**  
>  
> Secrets and salts not changed, is a security risk, and SaberQuest is not responsible for any damage caused by this.

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Scripts

- `dev` - Runs 'Prettier' and starts the development server on port 3001.
- `build` - Builds the application for deployment.
- `start` - Runs the built application in production mode.
- `prod` - Runs 'Prettier', builds the application, and runs it in production mode.
- `lint` - Runs ESLint on the project.
- `format` - Runs Prettier on the project.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

To learn more about Tailwind CSS, take a look at the following resources:

- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - learn about Tailwind CSS features and API.
- [Tailwind CSS Cheat Sheet](https://nerdcave.com/tailwind-cheat-sheet) - a cheat sheet for Tailwind CSS classes.

To learn more about Flowbite, take a look at the following resources:

- [Flowbite Documentation](https://flowbite.com/docs) - learn about Flowbite features and API.
- [Flowbite Community](https://community.flowbite.com) - a community for Flowbite users.

## License 📜

This project is licensed under the Apache-2.0 License - see the [LICENSE](LICENSE) file for details
