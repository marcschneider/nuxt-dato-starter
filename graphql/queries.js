export const contentQuery = `
  query ($id: ItemId = "") {
    page(filter: {id: {eq: $id}}) {
      pageName
      id
    }
  }
`
export const matchingSlugsQuery = `
  query ($slug: String) {
    allPages(filter: {slug: {eq: $slug}}) {
      id
      slug
      pageName
      parent {
        id
        slug
        pageName
        parent {
          id
          slug
          pageName
        }
      }
    }
  }
`

export const specialSlugsQuery = `
      query {
        setting {
          specialSlugBlog
          specialSlugTeam
        }
      }
    `
