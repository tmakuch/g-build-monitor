module.exports = (result, pr) => {
  result[pr.number] = {
    number: pr.number,
    url: pr.html_url,
    state: pr.state,
    title: pr.title,
    author: {
      login: pr.user.login,
      avatar: pr.user.avatar_url,
      url: pr.user.html_url,
    },
    createdAt: pr.created_at,
    updatedAt: pr.updated_at,
    labels: pr.labels,
    reviewers: {
      users: pr.requested_reviewers,
      teams: pr.requested_teams,
    },
    isDraft: pr.draft,
    branchHeadSha: pr.head.sha,
    branchRef: pr.head.ref,
  };

  return result;
};
