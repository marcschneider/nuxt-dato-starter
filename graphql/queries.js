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

export const sectionRichText = `
  fragment SectionRichTextRecordFields on SectionRichTextRecord {
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
  ${sectionRichText}

  query ($id: ItemId) {
    page(filter: {id: {eq: $id}}) {
      content {
        ... SectionTitleRecordFields
        ... SectionRichTextRecordFields
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
  
  query ($slug: String) {
    team(filter: {slug: {eq: $slug}}) {
      name
      content {
        ... SectionTitleRecordFields
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
  
  query ($slug: String) {    
    blog(filter: {slug: {eq: $slug}}) {
      title
      content {
        ... SectionTitleRecordFields
      }
      _seoMetaTags {
        attributes
        content
        tag
      }
    }
  }
`
