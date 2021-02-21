const errorHandler = (err, vm, info) => {
  console.log('Vue[errorHandler]:', err, info)
  const jwtErrors = ['jwt malformed', 'jwt expired', 'jwt not active', 'invalid token']
  if (jwtErrors.some(jwtErrors => err.message.includes(jwtErrors))) {
    vm.$router.push({
      path: '/login',
      query: { redirect: vm.$route.path }
    })
  }
}

const formatErrors = message => {
  const messageSplit = message.split(':')
  return messageSplit[messageSplit.length - 1].trim()
}

export {
  formatErrors,
  errorHandler
}
