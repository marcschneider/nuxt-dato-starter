export default function (name) {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '')
}
