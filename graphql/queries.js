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

export const sectionTitle = `
  fragment SectionTitleRecordFields on SectionTitleRecord {
    _modelApiKey
    id
    title
  }
`

export const sectionLead = `
  fragment SectionLeadRecordFields on SectionLeadRecord {
    _modelApiKey
    id
    text
  }
`

export const commonContentQuery = `
  ${sectionTitle}  
  ${sectionLead}

  query ($id: ItemId) {
    page(filter: {id: {eq: $id}}) {
      title
      content {
        ... SectionLeadRecordFields
        ... SectionTitleRecordFields
      }
    }
  }
`

export const teamContentQuery = `
  ${sectionTitle}  
  ${sectionLead}
  
  query ($slug: String) {
    team(filter: {slug: {eq: $slug}}) {
      title
      content {
        ... SectionLeadRecordFields
        ... SectionTitleRecordFields
      }
    }
  }
`

export const blogContentQuery = `
  ${sectionTitle}  
  ${sectionLead}
  
  query ($slug: String) {
    blog(filter: {slug: {eq: $slug}}) {
      title
      content {
        ... SectionLeadRecordFields
        ... SectionTitleRecordFields
      }
    }
  }
`
