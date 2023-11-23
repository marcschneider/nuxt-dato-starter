export const menuHeaderQuery = `
  query MenuHeaderQuery {
    layout {
      menuHeader {
        id
        title
        pointsTo {
          slug
          parent {
            slug
            parent {
              slug
            }
          }
        }
      }
    }
  }
`

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

export const sectionText = `
  fragment SectionTextRecordFields on SectionTextRecord {
    _modelApiKey
    id
    text {
      blocks
      links
      value
    }
  }
`

export const commonContentQuery = `
  ${sectionTitle}  
  ${sectionLead}
  ${sectionText}

  query ($id: ItemId) {
    page(filter: {id: {eq: $id}}) {
      title
      content {
        ... SectionTitleRecordFields
        ... SectionLeadRecordFields
        ... SectionTextRecordFields
      }
      _seoMetaTags {
        attributes
        content
        tag
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
        ... SectionTitleRecordFields
        ... SectionLeadRecordFields
      }
      _seoMetaTags {
        attributes
        content
        tag
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
        ... SectionTitleRecordFields
        ... SectionLeadRecordFields
      }
      _seoMetaTags {
        attributes
        content
        tag
      }
    }
  }
`
