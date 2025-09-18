export const handleFormSubmit = (e, callback) => {
  e.preventDefault()
  callback()
}

export const handleInputChange = (setter) => (e) => {
  setter(e.target.value)
}

export const handleCheckboxChange = (setter) => (e) => {
  setter(e.target.checked)
}
