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

export const teamContentQuery = `
  query ($slug: String = "") {
    team(filter: {slug: {eq: $slug}}) {
      title
    }
  }
`

export const blogContentQuery = `
  query ($slug: String = "") {
    blog(filter: {slug: {eq: $slug}}) {
      title
    }
  }
`
