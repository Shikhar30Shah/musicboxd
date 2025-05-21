// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure = (S) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem('review').title('Review'),
      S.documentTypeListItem('user').title('Users'),
    ])
