export const matchingSlugsQuery = `
  query ($slug: String) {
    allPages(filter: {slug: {eq: $slug}}) {
      id
      slug      
      parent {
        id
        slug        
        parent {
          id
          slug          
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

export const commonContentQuery = `
  query ($id: ItemId) {
    page(filter: {id: {eq: $id}}) {
      title
      content {
        ... on SectionLeadRecord {
          _modelApiKey
          id
          text
        }
        ... on SectionTitleRecord {
          _modelApiKey
          id
          title
        }
      }
    }
  }
`

export const teamContentQuery = `
  query ($slug: String) {
    team(filter: {slug: {eq: $slug}}) {
      title
      content {
        ... on SectionLeadRecord {
          _modelApiKey
          id
          text
        }
        ... on SectionTitleRecord {
          _modelApiKey
          id
          title
        }
      }
    }
  }
`

export const blogContentQuery = `
  query ($slug: String) {
    blog(filter: {slug: {eq: $slug}}) {
      title
      content {
        ... on SectionLeadRecord {
          _modelApiKey
          id
          text
        }
        ... on SectionTitleRecord {
          _modelApiKey
          id
          title
        }
      }
    }
  }
`
