/**
 * ! Luồng xử lý Trang tra cứu tuyển sinh
 * * Kiểm tra ô đã check chưa ?
 * *    Thông báo cho người dùng
 * * Kiểm tra input có rỗng hay không ?
 * *    Thông báo cho người dùng
 * * Gọi hàm call API
 * *    setLoading(true)
 * *    Kiểm tra result trả về ?
 * *        TH1: result != null
 * *                setData(result)
 * *                setLoading(false)
 * *                chuyển sang trang kết quả
 * *        TH2: result == null
 * *                setData(null)
 * *                setLoading(false)
 * *                Thông báo cho người dùng
 */
