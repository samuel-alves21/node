const DEFAULT_LIMIT = 0
const DEFAULT_PAGE = 1

function getPagination(size, page) {
  const currentPage = Math.abs(page) || DEFAULT_PAGE
  const limit = Math.abs(size) || DEFAULT_LIMIT
  const skip = (currentPage - 1) * limit
  
  return {
    limit,
    skip
  }
}

module.exports = {
  getPagination
}