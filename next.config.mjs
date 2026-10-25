const isGithubActions = process.env.GITHUB_ACTIONS === 'true';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: isGithubActions ? (process.env.GITHUB_REPOSITORY ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}` : '/SAIVIKAS-PORTFOLIO-') : '',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
