export const getListProduct = (req, res) => {
  console.log("danh sach san pham")
  return res.send("danh sach san pham")
}

export const getDetailProduct = (req, res) => {
  console.log("chi tiet san pham")
  return res.send("chi tiet san pham")

}

export const createProduct = (req, res) => {
  console.log("tao moi san pham")
  return res.send("tao moi san pham")

}

export const updateProduct = (req, res) => {
  console.log("cap nhat san pham")
  return res.send("cap nhat san pham")

}

export const deleteProduct = (req, res) => {
  console.log("xoa san pham")
  return res.send("xoa san pham")

}
