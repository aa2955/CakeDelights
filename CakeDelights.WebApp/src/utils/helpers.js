export const convertImageToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject('No file provided')
      return
    }

    // Check file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      reject('File size must be less than 5MB')
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      resolve(reader.result)
    }
    reader.onerror = () => {
      reject('Failed to read file')
    }
    reader.readAsDataURL(file)
  })
}

export const formatCurrency = (amount) => {
  return `$${amount.toFixed(2)}`
}

export const validateMenuItem = (item) => {
  const errors = []

  if (!item.name || item.name.trim() === '') {
    errors.push('Item name is required')
  }

  if (!item.description || item.description.trim() === '') {
    errors.push('Description is required')
  }

  if (!item.sizes || item.sizes.length === 0) {
    errors.push('At least one size option is required')
  } else {
    item.sizes.forEach((size, index) => {
      if (!size.size || size.size.trim() === '') {
        errors.push(`Size option ${index + 1}: Size name is required`)
      }
      if (size.price === undefined || size.price === null || size.price === '') {
        errors.push(`Size option ${index + 1}: Price is required`)
      } else if (isNaN(size.price) || parseFloat(size.price) < 0) {
        errors.push(`Size option ${index + 1}: Price must be a valid number`)
      }
    })
  }

  return errors
}
