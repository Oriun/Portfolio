const PublicRepoUrl = `https://api.github.com/users/Oriun/repos`;

type GithubApiRepo = {
  id: string;
  full_name: string;
  html_url: string;
  updated_at: string;
};
type Repo = {
  id: string;
  name: string;
  url: string;
  last_update: Date;
};
export const getPublicRepositories = (): Promise<Repo[]> =>
  fetch(PublicRepoUrl)
    .then((res) => {
      if (res.status === 200) return res.json();
      else throw res;
    })
    .then((res) => {
      return res.map((repo: GithubApiRepo) => {
        return {
          id: repo.id,
          name: repo.full_name,
          url: repo.html_url,
          last_update: new Date(repo.updated_at),
        };
      });
    });
