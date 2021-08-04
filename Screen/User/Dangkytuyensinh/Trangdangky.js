import DateTimePicker from "@react-native-community/datetimepicker";
import NetInfo from "@react-native-community/netinfo";
import { useHeaderHeight } from "@react-navigation/stack";
import { BlurView } from "expo-blur";
import Constants from "expo-constants";
import { Button, CheckBox, Picker, Text, View } from "native-base";
import RadioButtonRN from "radio-buttons-react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Dimensions,
  KeyboardAvoidingView,
  LogBox,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import AnimatedEllipsis from "react-native-animated-ellipsis";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { Colors, IconButton } from "react-native-paper";
import {
  Cell,
  Col,
  Row,
  Table,
  TableWrapper,
} from "react-native-table-component";
import { Camera } from "expo-camera";

import FileDinhKem from "./FileDinhKem";
const { height, width } = Dimensions.get("window");
const { statusBarHeight } = Constants;

LogBox.ignoreLogs([
  "VirtualizedLists should never be nested inside plain ScrollViews with the same orientation - use another VirtualizedList-backed container instead.",
]);

//* hàm chuyển đổi ngày tháng
const date = require("s-date");

//* Hàm xử lý picker ngày tháng
function useInput(_date) {
  const [date, setDate] = useState(_date);
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const showMode = (currentMode) => {
    setShow(!show);
    setMode(currentMode);
  };
  const showDatepicker = () => {
    showMode("date");
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };
  return {
    date,
    showDatepicker,
    show,
    mode,
    onChange,
  };
}

//* Xử lý input số
function XuLy_Nhap_So(value) {
  value = value.replace(/[^a-zA-Z0-9]/g, "").replace(/_{2,}/g, "");
  console.log(value);
  return value;
}

export default function Trangdangky({ route, navigation }) {
  const { DoiTuongTuyenSinh, IDKyThi } = route.params;
  const headerHeight = useHeaderHeight();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Đăng ký tuyển sinh",
    });
  });

  const [loading, setLoading] = useState(true);

  const [data, setData] = useState({
    MaHocSinh: "",
    MatKhau: "",
    HoTen: "",
    NgaySinh: "",
    DanToc: "Chọn dân tộc",
    GioiTinh: null,
    // Nơi sinh
    IDTinhNS: "",
    IDHuyenNS: "",
    IDXaNS: "",
    DiaChiNS: "",
    // Thường trú
    IDTinhTT: "",
    IDHuyenTT: "",
    IDXaTT: "",
    DiaChiTT: "",
    NgayCap_ThuongTru: "",
    // Tạm trú
    IDTinhTamTru: "",
    IDHuyenTamTru: "",
    IDXaTamTru: "",
    DiaChiTamTru: "",
    NgayCap_TamTru: "",
    // Nơi ở
    IDTinh: "",
    IDHuyen: "",
    IDXa: "",
    DiaChi: "",
    // Chương trình cấp dưới
    IDTinhCT: "",
    IDHuyenCT: "",
    IDXaCT: "",
    TenLopCT: "",
    TenTruongCT: "",
    NamHoanThanhCT: "",

    HanhKiem: "",
    HocLuc: "",
    HocBa: [],
    NguyenVong: [
      {
        NguyenVong: 1,
        IDTruong: "",
        CoSoDangKy: "",
        IDLopChuyen: "",
        IDMonChuyen: "",
        lstLopChuyen: [],
      },
    ],
    DoiTuongUuTien: [],
    CoGiaiThuongQuocGia: false,
    FileDinhKem: [],

    HoTen_Me: "",
    Tuoi_Me: "",
    DonViCongTac_Me: "",
    NgheNghiep_Me: "",
    SDT_Me: "",

    HoTen_Cha: "",
    Tuoi_Cha: "",
    DonViCongTac_Cha: "",
    NgheNghiep_Cha: "",
    SDT_Cha: "",

    HoTen_NGH: "",
    Tuoi_NGH: "",
    DonViCongTac_NGH: "",
    NgheNghiep_NGH: "",
    SDT_NGH: "",

    DienThoaiLienHe: "",
    MailLienHe: "",
    Xacnhanthongtin: false,
    NguyenVong_Picker: [
      // Nguyện vọng 1
      [
        {
          ID: 1,
          IDTruong: "",
          MaTruong: "",
          TenTruong: "Chọn trường",
          DiaChi: "",
          IDTinh: "",
          IDQuan: "",
          IDPhuong: "",
          idKeHoach: "",
        },
      ],
    ],
  });

  // console.log(data.DanhSachFileDinhKem.length);

  //#region Ngày tháng
  const inputCon = useInput(new Date());
  const inputThuongTru = useInput(new Date());
  const inputTamTru = useInput(new Date());

  //#endregion

  //#region Học bạ: Table - Call API
  const XuLy_Nhap_DiemHocBa = (indexRow, indexCell, value) => {
    value = value.replace(/[^a-zA-Z0-9]/g, ",").replace(/_{2,}/g, ",");
    // console.log(value.split(",").length);

    if (value.split(",").length > 2) {
      value = "0";
      // value = data.HocBa[indexRow][indexCell].Diem;
    }
    if (parseInt(value, 10) > 10) {
      value = "10";
    }
    if (value.includes(",")) {
      return {
        Value: value,
        Type: "number-pad",
        Lenght: 4, // 0,00
      };
    }
    return {
      Value: value,
      Type: "decimal-pad",
      Lenght: 2,
    };
  }; // number-pad
  const XuLy_Xuat_DiemHocBa = (number) => {
    // console.log(typeof number);
    // console.log(number);
    // trường hợp đặc biệt
    if (
      // number === null ||
      // number === "" ||
      number === undefined ||
      number.includes(",,") ||
      number === "0,00" ||
      number === "0,0" ||
      number === "0," ||
      number === "00"
    ) {
      return "0";
    }
    // số lớn hơn 10
    if (number > 10) {
      return "10";
    }
    // xử lý sau dấu ' , '
    const number_split = number.toString().split(",");
    if (number_split[0] === "") {
      number_split[0] = 0;
    }
    if (
      number_split[1] === "0" ||
      number_split[1] === "00" ||
      number_split[1] === ""
    ) {
      return number_split[0];
    }
    // sau dấu ' , ' là số tròn chục
    if (number_split[1] % 10 == 0) {
      number_split[1] = number_split[1] / 10;
    }
    return number_split.join(".");
  };
  const _ChuyenDoi_DiemHocBa = (num) => {
    if (/^[a-zA-Z]+$/.test(num)) {
      return "num";
    }
    return 2;
  };

  //* Tạo bảng
  const inputTable = (indexRow, indexCell, itemCell) => (
    <TextInput
      style={{ paddingLeft: 5 }}
      placeholder="Nhập điểm ..."
      keyboardType={itemCell.Type}
      maxLength={itemCell.Lenght}
      multiline={false}
      onChangeText={(value) => NhapDiemHocBa(indexRow, indexCell, value)}
    >
      {data.HocBa[indexRow][indexCell].Diem}
    </TextInput>
  );
  const [table, setTable] = useState({
    tableHead: [],
    tableTitle: [],
    //tableData: [],
  });
  const NhapDiemHocBa = (indexRow, indexCell, value) => {
    const arr = [...data.HocBa];
    arr[indexRow][indexCell].Diem = XuLy_Nhap_DiemHocBa(
      indexRow,
      indexCell,
      value
    ).Value; // value
    arr[indexRow][indexCell].Type = XuLy_Nhap_DiemHocBa(
      indexRow,
      indexCell,
      value
    ).Type; // value
    arr[indexRow][indexCell].Lenght = XuLy_Nhap_DiemHocBa(
      indexRow,
      indexCell,
      value
    ).Lenght; // value
    setData((prev) => ({
      ...prev,
      HocBa: arr,
    }));
  };
  //* Gọi API danh sách học bạ
  useEffect(() => {
    fetch(
      `http://tuyensinhvinhphuc.eduvi.vn/api/TSAPIService/gethocba?idKyThi=${IDKyThi}`
    )
      .then((response) => response.json())
      .then((responseJson) => {
        const diemData = [];
        const lstMon = [];
        const lstLop = [];
        //const lstDiem = [];
        // Đổ dữ liệu lớp và tạo điểm
        responseJson.Result.data.lstLopHoc.map((item_Lop, index_Lop) => {
          diemData.push([]);
          //lstDiem.push([]);
          lstLop.push("Lớp " + item_Lop);
          responseJson.Result.data.lstMonHoc.map((item_Mon, index_Mon) => {
            //lstDiem[index_Lop].push(inputTable());
            // Tạo đối tượng điểm data
            const obj = {
              IDMonThi: item_Mon.ID,
              Lop: item_Lop,
              Type: "decimal-pad",
              Lenght: 2,
              Diem: null,
            };
            diemData[index_Lop].push(obj);
          });
        });
        // Đổ dữ liệu môn
        responseJson.Result.data.lstMonHoc.map((item_Mon, index_Mon) => {
          lstMon.push(item_Mon.Ten);
        });

        setData((prevState) => ({
          ...prevState,
          HocBa: diemData,
        }));
        setTable((prevState) => ({
          ...prevState,
          tableHead: lstMon,
          tableTitle: lstLop,
          //tableData: lstDiem,
        }));
      });
  }, [0]);

  //#endregion

  //#region DropPicker: Dữ liệu - Thay đổi value khi chọn
  //* Dữ liệu trong dropDown
  const dantocData = require("./Dantoc.json");
  const [picker, setPicker] = useState({
    DanToc: dantocData.dantoc,
    // Nơi sinh
    IDTinhNS: [
      {
        id: "",
        name: "Chọn Tỉnh/Thành phố",
      },
    ],
    IDHuyenNS: [
      {
        id: "",
        name: "Chọn Quận/Huyện",
      },
    ],
    IDXaNS: [
      {
        id: "",
        name: "Chọn Phường/Xã",
      },
    ],
    // Thường trú
    IDTinhTT: [
      {
        id: "",
        name: "Chọn Tỉnh/Thành phố",
      },
    ],
    IDHuyenTT: [
      {
        id: "",
        name: "Chọn Quận/Huyện",
      },
    ],
    IDXaTT: [
      {
        id: "",
        name: "Chọn Phường/Xã",
      },
    ],
    // Tạm trú
    IDTinhTamTru: [
      {
        id: "",
        name: "Chọn Tỉnh/Thành phố",
      },
    ],
    IDHuyenTamTru: [
      {
        id: "",
        name: "Chọn Quận/Huyện",
      },
    ],
    IDXaTamTru: [
      {
        id: "",
        name: "Chọn Phường/Xã",
      },
    ],
    // Nơi ở
    IDTinh: [
      {
        id: "",
        name: "Chọn Tỉnh/Thành phố",
      },
    ],
    IDHuyen: [
      {
        id: "",
        name: "Chọn Quận/Huyện",
      },
    ],
    IDXa: [
      {
        id: "",
        name: "Chọn Phường/Xã",
      },
    ],
    // Chương trình cấp dưới
    IDTinhCT: [
      {
        id: "",
        name: "Chọn Tỉnh/Thành phố",
      },
    ],
    IDHuyenCT: [
      {
        id: "",
        name: "Chọn Quận/Huyện",
      },
    ],
    IDXaCT: [
      {
        id: "",
        name: "Chọn Phường/Xã",
      },
    ],
    DoiTuongUuTien: [],
    HanhKiem: [
      {
        id: "",
        name: "Chọn hạnh kiểm",
      },
      {
        id: "Tốt",
        name: "Tốt",
      },
      {
        id: "Khá",
        name: "Khá",
      },
      {
        id: "Trung bình",
        name: "Trung bình",
      },
      {
        id: "Yếu",
        name: "Yếu",
      },
    ],
    HocLuc: [
      {
        id: "",
        name: "Chọn học lực",
      },
      {
        id: "Giỏi",
        name: "Giỏi",
      },
      {
        id: "Khá",
        name: "Khá",
      },
      {
        id: "Trung bình",
        name: "Trung bình",
      },
      {
        id: "Yếu",
        name: "Yếu",
      },
      {
        id: "Kém",
        name: "Kém",
      },
    ],
  });
  /*   console.log(`data.NguyenVong: ${data.NguyenVong.length}
  data.Picker: ${data.NguyenVong_Picker.length}`); */
  const [DSdoituonguutien, setDSdoituonguutien] = useState([]);
  //* Chọn giá trị cho Picker
  const changeValuePicker = (arg) => {
    setData((prevState) => ({
      ...prevState,
      ...arg,
    }));
  };
  //#endregion

  //#region Minh Chứng: Ẩn hiện
  const [loaiminhchung, setLoaiMinhChung] = useState(null);
  const [loaiminhchung_cache, setLoaiMinhChung_cache] = useState(null);
  const [cameraPermission, setCameraPermission] = useState(null);

  //* Gọi API loại minh chứng
  useEffect(() => {
    fetch(
      `http://tuyensinhvinhphuc.eduvi.vn/api/TSAPIService/getminhchung?cap=${DoiTuongTuyenSinh}`
    )
      .then((res) => res.json())
      .then((responseJson) => {
        let lst_Loai_MinhChung = responseJson.Result.results.map((item, i) => ({
          ...item,
          trangthai: false, // trạng thái của mình chứng đang được chọn
          lstMinhChung: [], // danh sách ảnh minh chứng được chọn
        }));
        // console.log(lst_Loai_MinhChung);
        setLoaiMinhChung(lst_Loai_MinhChung);
      })
      .catch(setLoaiMinhChung(null));
    return () => {
      // clean memory
      setLoaiMinhChung(null);
    };
  }, [0]);
  const _mediaLibraryAsync = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    // console.log(status);
    setCameraPermission(status);
  };
  //* Hiển thị modal
  const HienThi_ModalMinhChung = () => {
    // _mediaLibraryAsync();

    // Tạo localStore lưu trữ danh sách ảnh khi chưa hiển thị
    // AsyncStorage.setItem("Lst_MinhChung_Cu", loaiminhchung);
    // if (cameraPermission === "granted") {
    setLoaiMinhChung_cache(loaiminhchung);
    // Hiển thị modal
    setModal_MinhChung(true);
    // } else {
    //   setModal_MinhChung(false);
    // }
  };

  //#endregion

  //#region Nguyện Vọng: Thêm - Xóa - Sửa Value - List - Call API
  //* Nguyện vọng 1
  useEffect(() => {
    fetch(
      `http://tuyensinhvinhphuc.eduvi.vn/api/TSAPIService/getschoolall?cap=${DoiTuongTuyenSinh}`
    )
      .then((response) => response.json())
      .then((responseJson) => {
        const arrData = [
          {
            ID: 1,
            IDTruong: "",
            MaTruong: "",
            TenTruong: "Chọn trường",
            DiaChi: "",
            IDTinh: "",
            IDQuan: "",
            IDPhuong: "",
            idKeHoach: "",
          },
        ];
        // console.log(DoiTuongTuyenSinh, responseJson);
        responseJson.Result.results.map((item, index) => {
          const obj = {
            ID: 1,
            IDTruong: item.ID,
            MaTruong: item.MaTruong,
            TenTruong: item.TenTruong,
            DiaChi: item.DiaChi,
            IDTinh: item.IDTinh,
            IDQuan: item.IDQuan,
            IDPhuong: item.IDPhuong,
            idKeHoach: item.idKeHoach,
          };
          arrData.push(obj);
        });
        //console.log(arrData[1]);
        setData((prevState) => ({
          ...prevState,
          NguyenVong_Picker: [arrData],
        }));
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      })
      .catch((error) => {
        setData((prevState) => ({
          ...prevState,
          NguyenVong_Picker: [
            [
              {
                ID: 1,
                IDTruong: "",
                MaTruong: "",
                TenTruong: "Chọn trường",
                DiaChi: "",
                IDTinh: "",
                IDQuan: "",
                IDPhuong: "",
                idKeHoach: "",
              },
            ],
          ],
        }));
      });
  }, [0]);

  //* Thêm nguyện vọng
  const ThemNV = (stt_nguyenvong, arrData) => {
    //console.log(stt_nguyenvong, arrData);
    // Tạo thêm 1 data Nguyện vọng
    var obj = {
      NguyenVong: stt_nguyenvong,
      IDTruong: "",
      CoSoDangKy: "",
      IDLopChuyen: 0,
      IDMonChuyen: 0,
      lstLopChuyen: [],
    };
    setData((prevState) => ({
      ...prevState,
      NguyenVong: [...prevState.NguyenVong, obj],
      NguyenVong_Picker: [...prevState.NguyenVong_Picker, arrData],
    }));
  };
  //* Xóa nguyện vọng
  const XoaNV = () => {
    setData((prevState) => ({
      ...prevState,
      NguyenVong: prevState.NguyenVong.filter((item, index) => {
        return index === 0;
      }),
      NguyenVong_Picker: prevState.NguyenVong_Picker.filter((item, index) => {
        return index === 0;
      }),
    }));
  };
  //* Chọn nguyện vọng 1
  const ChonNguyenVong1 = (itemParent, indexParent, itemValue) => {
    let obj = {
      ...itemParent,
      IDTruong: itemValue,
      CoSoDangKy: "",
      IDLopChuyen: 0,
      IDMonChuyen: 0,
      lstLopChuyen: [],
    };
    setData((prevState) => ({
      ...prevState,
      NguyenVong: prevState.NguyenVong.map((item, index) =>
        indexParent === index ? obj : item
      ),
    }));
    // Mỗi khi thay đổi nguyện vọng 1 thì sẽ xóa hết nguyện vọng còn lại tại data và picker
    XoaNV();
    //console.log(itemValue, IDKyThi);
    // Không phải mặc định thì mới gọi api
    if (itemValue !== null && itemValue !== "" && itemValue !== undefined) {
      // Gọi dữ liệu NV khác và trường chuyên
      fetch(
        `http://tuyensinhvinhphuc.eduvi.vn/api/TSAPIService/getschools?idTruong=${itemValue}&idKyThi=${IDKyThi}`
      )
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.Result.data.lstLopChuyen.length !== 0) {
            // Đổ dữ liệu lớp chuyên hoặc chất lượng cao tương ứng vào trường
            var arr_lstLopChuyen = [
              {
                ID: 0,
                TenLopChuyen: "Chọn lớp",
                TenMonChuyen: "",
                IDLopChuyen: 0,
                IDMonChuyen: 0,
                lstChild: [],
              },
            ];
            responseJson.Result.data.lstLopChuyen.map((item, index) => {
              const _lstLopChuyen = {
                ID: index,
                TenLopChuyen: item.TenLopChuyen,
                TenMonChuyen: "",
                IDLopChuyen: item.IDLopChuyen,
                IDMonChuyen: 0,
                lstChild: item.lstChild === null ? [] : item.lstChild,
              };
              arr_lstLopChuyen.push(_lstLopChuyen);
            });
            //console.log(arr_lstLopChuyen);

            setData((prevState) => ({
              ...prevState,
              NguyenVong: prevState.NguyenVong.map((item, index) =>
                indexParent === index
                  ? {
                      ...item,
                      lstLopChuyen: arr_lstLopChuyen,
                    }
                  : item
              ),
            }));
          }
          if (responseJson.Result.data.lstNguyenVong_Group.length !== 0) {
            // Tạo nv phụ
            responseJson.Result.data.lstNguyenVong_Group.map(
              (item_lstNV, index_lstNV) => {
                // Tạo list NV phụ
                const arrData = [
                  {
                    ID: 0,
                    IDTruong: "",
                    MaTruong: "",
                    TenTruong: "Chọn trường",
                    DiaChi: "",
                    IDTinh: "",
                    IDQuan: "",
                    IDPhuong: "",
                    idKeHoach: "",
                  },
                ];
                // Đổ dữ liệu vào list NV phụ
                item_lstNV.lstChild.map((item_lstChild, index_lstChild) => {
                  const obj = {
                    ID: index_lstChild + 1,
                    IDTruong: item_lstChild.IDTruong,
                    MaTruong: item_lstChild.MaTruong,
                    TenTruong: item_lstChild.TenTruong,
                    DiaChi: item_lstChild.DiaChi,
                    IDTinh: item_lstChild.IDTinh,
                    IDQuan: item_lstChild.IDQuan,
                    IDPhuong: item_lstChild.IDPhuong,
                    idKeHoach: item_lstChild.idKeHoach,
                  };
                  arrData.push(obj);
                });

                // Tạo thêm nguyện vọng tương ứng đang chọn ở data và picker
                ThemNV(item_lstNV.NguyenVongSo, arrData);
              }
            );
          }
        });
    }
  };
  //* Chọn nguyện vọng thêm
  const ChonNguyenVongThem = (itemParent, indexParent, itemValue) => {
    let obj = {
      ...itemParent,
      IDTruong: itemValue,
      CoSoDangKy: "",
      IDLopChuyen: 0,
      IDMonChuyen: 0,
      lstLopChuyen: [],
    };
    setData((prevState) => ({
      ...prevState,
      NguyenVong: prevState.NguyenVong.map((item, index) =>
        indexParent === index ? obj : item
      ),
    }));
    // Không phải mặc định thì mới gọi api
    if (itemValue !== null && itemValue !== "" && itemValue !== undefined) {
      // Gọi dữ liệu NV khác và trường chuyên
      fetch(
        `http://tuyensinhvinhphuc.eduvi.vn/api/TSAPIService/gettruongchuyen?idTruong=${itemValue}`
      )
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.Result.data.lstLopChuyen.length !== 0) {
            // Đổ dữ liệu lớp chuyên hoặc chất lượng cao tương ứng vào trường
            var arr_lstLopChuyen = [
              {
                ID: 0,
                TenLopChuyen: "Chọn lớp",
                TenMonChuyen: "",
                IDLopChuyen: 0,
                IDMonChuyen: 0,
                lstChild: [],
              },
            ];
            responseJson.Result.data.lstLopChuyen.map((item, index) => {
              const _lstLopChuyen = {
                ID: index,
                TenLopChuyen: item.TenLopChuyen,
                TenMonChuyen: "",
                IDLopChuyen: item.ID,
                IDMonChuyen: 0,
                //lstChild: item.lstChild === null ? [] : item.lstChild,
                lstChild: [],
              };
              arr_lstLopChuyen.push(_lstLopChuyen);
            });
            //console.log(arr_lstLopChuyen);

            setData((prevState) => ({
              ...prevState,
              NguyenVong: prevState.NguyenVong.map((item, index) =>
                indexParent === index
                  ? {
                      ...item,
                      lstLopChuyen: arr_lstLopChuyen,
                    }
                  : item
              ),
            }));
          }
        });
    }
  };
  //* Chọn lớp chuyên
  const ChonLopChuyen = (itemParent, indexParent, itemValue) => {
    setData((prevState) => ({
      ...prevState,
      NguyenVong: prevState.NguyenVong.map((item, index) =>
        indexParent === index
          ? {
              ...item,
              IDLopChuyen: itemValue,
            }
          : item
      ),
    }));
  };
  //* List nguyện vọng
  const NV_MacDinh = () =>
    data.NguyenVong.map((itemParent, indexParent) => {
      return (
        indexParent === 0 && (
          //* Nguyện vọng 1
          <View
            style={{
              backgroundColor: "#d4e2d4",
              padding: 5,
              marginBottom: 15,
              borderWidth: 1,
              flexDirection: "column",
            }}
            key={indexParent.toString()}
          >
            <View style={{ borderWidth: 1 }}>
              <Picker
                selectedValue={itemParent.IDTruong}
                iosIcon={
                  <IconButton icon="menu-down" color={"black"} size={26} />
                }
                style={{ height: 40, flexGrow: 1, width: "100%" }}
                itemStyle={{ fontSize: 8 }}
                onValueChange={(itemValue, itemIndex) =>
                  ChonNguyenVong1(itemParent, indexParent, itemValue)
                }
              >
                {data.NguyenVong_Picker[indexParent].map(
                  (itemChild, indexChild) => {
                    //console.log(itemChild);
                    return (
                      <Picker.Item
                        key={itemChild.ID.toString()}
                        label={itemChild.TenTruong}
                        value={itemChild.IDTruong}
                      />
                    );
                  }
                )}
              </Picker>
            </View>
            {/*Chât lượng cao hoặc chuyên*/}
            {itemParent.lstLopChuyen.length !== 0 && (
              <View style={{ flexDirection: "row", marginTop: 2 }}>
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      padding: 10,
                      textAlignVertical: "center",
                      textAlign: "center",
                    }}
                    numberOfLines={1}
                  >
                    Chọn lớp :
                  </Text>
                </View>
                <View style={{ flexGrow: 1, borderWidth: 1 }}>
                  <Picker
                    selectedValue={itemParent.IDLopChuyen}
                    // iosIcon={
                    //   <IconButton icon="menu-down" color={"black"} size={26} />
                    // }
                    style={{ height: 40, flexGrow: 1 }}
                    itemStyle={{ fontSize: 8 }}
                    onValueChange={(itemValue, itemIndex) =>
                      ChonLopChuyen(itemParent, indexParent, itemValue)
                    }
                  >
                    {itemParent.lstLopChuyen.map((itemChild, indexChild) => {
                      //console.log(itemChild);
                      return (
                        <Picker.Item
                          key={itemChild.ID.toString()}
                          label={itemChild.TenLopChuyen}
                          value={itemChild.IDLopChuyen}
                        />
                      );
                    })}
                  </Picker>
                </View>
              </View>
            )}
          </View>
        )
      );
    });
  const ListNV_Them = () =>
    data.NguyenVong.map((itemParent, indexParent) => {
      return (
        indexParent !== 0 && (
          //* Nguyện vọng 1
          <View
            style={{
              backgroundColor: "#fcf8e8",
              padding: 5,
              marginBottom: 15,
              borderWidth: 1,
            }}
            key={indexParent.toString()}
          >
            <View style={{ borderWidth: 1 }}>
              <Picker
                selectedValue={itemParent.IDTruong}
                // iosIcon={
                //   <IconButton icon="menu-down" color={"black"} size={26} />
                // }
                style={{ height: 40, flexGrow: 1 }}
                itemStyle={{ fontSize: 8 }}
                onValueChange={(itemValue, itemIndex) =>
                  ChonNguyenVongThem(itemParent, indexParent, itemValue)
                }
              >
                {data.NguyenVong_Picker[indexParent].map(
                  (itemChild, indexChild) => {
                    //console.log(itemChild);
                    return (
                      <Picker.Item
                        key={itemChild.ID.toString()}
                        label={itemChild.TenTruong}
                        value={itemChild.IDTruong}
                      />
                    );
                  }
                )}
              </Picker>
            </View>
            {/*Chât lượng cao hoặc chuyên*/}
            {itemParent.lstLopChuyen.length !== 0 && (
              <View style={{ flexDirection: "row", marginTop: 2 }}>
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      padding: 10,
                      textAlignVertical: "center",
                      textAlign: "center",
                    }}
                    numberOfLines={1}
                  >
                    Chọn lớp :
                  </Text>
                </View>
                <View style={{ flexGrow: 1, borderWidth: 1 }}>
                  <Picker
                    selectedValue={itemParent.IDLopChuyen}
                    iosIcon={
                      <IconButton icon="menu-down" color={"black"} size={26} />
                    }
                    style={{ height: 40, flexGrow: 1, width: "100%" }}
                    itemStyle={{ fontSize: 8 }}
                    onValueChange={(itemValue, itemIndex) =>
                      ChonLopChuyen(itemParent, indexParent, itemValue)
                    }
                  >
                    {itemParent.lstLopChuyen.map((itemChild, indexChild) => {
                      //console.log(itemChild.ID.toString());
                      return (
                        <Picker.Item
                          key={itemChild.ID.toString()}
                          label={itemChild.TenLopChuyen}
                          value={itemChild.IDLopChuyen}
                        />
                      );
                    })}
                  </Picker>
                </View>
              </View>
            )}
          </View>
        )
      );
    });
  //#endregion

  //#region Pass - Modal : Ẩn hiện
  //* Ẩn hiện pass
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  //* Ẩn hiện modal Đối tượng ưu tiên
  const [modalVisible, setModalVisible] = useState(false);
  //* Ẩn hiện modal Ảnh minh chứng
  const [modal_MinhChung, setModal_MinhChung] = useState(false);
  //* Ẩn hiện modal Thư viện ảnh
  const [modal_Library, setModal_Library] = useState(false);
  //* Ẩn hiện modal Kiểm tra thông tin Đăng ký
  const [modal_KiemTraVisible, setModal_KiemTraVisible] = useState(false);
  //#endregion

  //#region API - Call:  tỉnh-huyện-xã
  //#region Tỉnh
  //* Tỉnh:
  useEffect(() => {
    fetch(
      "http://tuyensinhvinhphuc.eduvi.vn/api/TSAPIService/getaddress?idParent=1&level=1"
    )
      .then((response) => response.json())
      .then((responseJson) => {
        const arrData = [
          {
            id: "",
            name: "Chọn Tỉnh/Thành phố",
          },
        ];
        responseJson.Result.results.map((item, index) => {
          const obj = {
            id: item.ID,
            name: item.TenDiaChi,
          };
          arrData.push(obj);
        });
        setPicker((prevState) => ({
          ...prevState,
          IDTinhNS: arrData,
          IDTinhTT: arrData,
          IDTinhTamTru: arrData,
          IDTinhCT: arrData,
          IDTinh: arrData,
        }));
      })
      .catch((error) => {
        const arrDataFail = [
          {
            id: "",
            name: "Chọn Tỉnh/Thành phố",
          },
        ];
        setPicker((prevState) => ({
          ...prevState,
          IDTinhCT: arrDataFail,
          IDTinhNS: arrDataFail,
          IDTinhTamTru: arrDataFail,
          IDTinhTT: arrDataFail,
          IDTinh: arrDataFail,
        }));
      });
  }, [0]);
  //#endregion
  //#region Huyện
  //* Huyện NS
  useEffect(() => {
    //! Cứ khi ID tỉnh thay đổi thì set id và picker huyện-xã về null
    changeValuePicker({ IDHuyenNS: "", IDXaNS: "" });
    setPicker((prevState) => ({
      ...prevState,
      IDHuyenNS: [
        {
          id: "",
          name: "Chọn Quận/Huyện",
        },
      ],
      IDXaNS: [
        {
          id: "",
          name: "Chọn Phường/xã",
        },
      ],
    }));
    fetch(
      `http://tuyensinhvinhphuc.eduvi.vn/api/TSAPIService/getaddress?idParent=${data.IDTinhNS}&level=2`
    )
      .then((response) => response.json())
      .then((responseJson) => {
        const arrData = [
          {
            id: "",
            name: "Chọn Quận/Huyện",
          },
        ];
        responseJson.Result.results.map((item, index) => {
          const obj = {
            id: item.ID,
            name: item.TenDiaChi,
          };
          arrData.push(obj);
        });
        setPicker((prevState) => ({
          ...prevState,
          IDHuyenNS: arrData,
        }));
      })
      .catch((error) => {
        setPicker((prevState) => ({
          ...prevState,
          IDHuyenNS: [
            {
              id: "",
              name: "Chọn Quận/Huyện",
            },
          ],
        }));
      });
  }, [data.IDTinhNS]);
  //* Huyện TT
  useEffect(() => {
    //! Cứ khi ID tỉnh thay đổi thì set id và picker huyện-xã về null
    changeValuePicker({ IDHuyenTT: "", IDXaTT: "" });
    setPicker((prevState) => ({
      ...prevState,
      IDHuyenTT: [
        {
          id: "",
          name: "Chọn Quận/Huyện",
        },
      ],
      IDXaTT: [
        {
          id: "",
          name: "Chọn Phường/xã",
        },
      ],
    }));
    fetch(
      `http://tuyensinhvinhphuc.eduvi.vn/api/TSAPIService/getaddress?idParent=${data.IDTinhTT}&level=2`
    )
      .then((response) => response.json())
      .then((responseJson) => {
        const arrData = [
          {
            id: "",
            name: "Chọn Quận/Huyện",
          },
        ];
        responseJson.Result.results.map((item, index) => {
          const obj = {
            id: item.ID,
            name: item.TenDiaChi,
          };
          arrData.push(obj);
        });
        setPicker((prevState) => ({
          ...prevState,
          IDHuyenTT: arrData,
        }));
      })
      .catch((error) => {
        setPicker((prevState) => ({
          ...prevState,
          IDHuyenTT: [
            {
              id: "",
              name: "Chọn Quận/Huyện",
            },
          ],
        }));
      });
  }, [data.IDTinhTT]);
  //* Huyện TamTru
  useEffect(() => {
    //! Cứ khi ID tỉnh thay đổi thì set id và picker huyện-xã về null
    changeValuePicker({ IDHuyenTamTru: "", IDXaTamTru: "" });
    setPicker((prevState) => ({
      ...prevState,
      IDHuyenTamTru: [
        {
          id: "",
          name: "Chọn Quận/Huyện",
        },
      ],
      IDXaTamTru: [
        {
          id: "",
          name: "Chọn Phường/xã",
        },
      ],
    }));
    fetch(
      `http://tuyensinhvinhphuc.eduvi.vn/api/TSAPIService/getaddress?idParent=${data.IDTinhTamTru}&level=2`
    )
      .then((response) => response.json())
      .then((responseJson) => {
        const arrData = [
          {
            id: "",
            name: "Chọn Quận/Huyện",
          },
        ];
        responseJson.Result.results.map((item, index) => {
          const obj = {
            id: item.ID,
            name: item.TenDiaChi,
          };
          arrData.push(obj);
        });
        setPicker((prevState) => ({
          ...prevState,
          IDHuyenTamTru: arrData,
        }));
      })
      .catch((error) => {
        setPicker((prevState) => ({
          ...prevState,
          IDHuyenTamTru: [
            {
              id: "",
              name: "Chọn Quận/Huyện",
            },
          ],
        }));
      });
  }, [data.IDTinhTamTru]);
  //* Huyện
  useEffect(() => {
    //! Cứ khi ID tỉnh thay đổi thì set id và picker huyện-xã về null
    changeValuePicker({ IDHuyen: "", IDXa: "" });
    setPicker((prevState) => ({
      ...prevState,
      IDHuyen: [
        {
          id: "",
          name: "Chọn Quận/Huyện",
        },
      ],
      IDXa: [
        {
          id: "",
          name: "Chọn Phường/xã",
        },
      ],
    }));
    fetch(
      `http://tuyensinhvinhphuc.eduvi.vn/api/TSAPIService/getaddress?idParent=${data.IDTinh}&level=2`
    )
      .then((response) => response.json())
      .then((responseJson) => {
        const arrData = [
          {
            id: "",
            name: "Chọn Quận/Huyện",
          },
        ];
        responseJson.Result.results.map((item, index) => {
          const obj = {
            id: item.ID,
            name: item.TenDiaChi,
          };
          arrData.push(obj);
        });
        setPicker((prevState) => ({
          ...prevState,
          IDHuyen: arrData,
        }));
      })
      .catch((error) => {
        setPicker((prevState) => ({
          ...prevState,
          IDHuyen: [
            {
              id: "",
              name: "Chọn Quận/Huyện",
            },
          ],
        }));
      });
  }, [data.IDTinh]);
  //* Huyện CT
  useEffect(() => {
    //! Cứ khi ID tỉnh thay đổi thì set id và picker huyện-xã về null
    changeValuePicker({ IDHuyenCT: "", IDXaCT: "" });
    setPicker((prevState) => ({
      ...prevState,
      IDHuyenCT: [
        {
          id: "",
          name: "Chọn Quận/Huyện",
        },
      ],
      IDXaCT: [
        {
          id: "",
          name: "Chọn Phường/xã",
        },
      ],
    }));
    fetch(
      `http://tuyensinhvinhphuc.eduvi.vn/api/TSAPIService/getaddress?idParent=${data.IDTinhCT}&level=2`
    )
      .then((response) => response.json())
      .then((responseJson) => {
        const arrData = [
          {
            id: "",
            name: "Chọn Quận/Huyện",
          },
        ];
        responseJson.Result.results.map((item, index) => {
          const obj = {
            id: item.ID,
            name: item.TenDiaChi,
          };
          arrData.push(obj);
        });
        setPicker((prevState) => ({
          ...prevState,
          IDHuyenCT: arrData,
        }));
      })
      .catch((error) => {
        setPicker((prevState) => ({
          ...prevState,
          IDHuyenCT: [
            {
              id: "",
              name: "Chọn Quận/Huyện",
            },
          ],
        }));
      });
  }, [data.IDTinhCT]);
  //#endregion
  //#region Xã
  //* Xã NS
  useEffect(() => {
    //! Cứ khi ID huyện thay đổi thì set id và picker xã về null
    changeValuePicker({ IDXaNS: "" });
    setPicker((prevState) => ({
      ...prevState,
      IDXaNS: [
        {
          id: "",
          name: "Chọn Phường/xã",
        },
      ],
    }));
    fetch(
      `http://tuyensinhvinhphuc.eduvi.vn/api/TSAPIService/getaddress?idParent=${data.IDHuyenNS}&level=3`
    )
      .then((response) => response.json())
      .then((responseJson) => {
        const arrData = [
          {
            id: "",
            name: "Chọn Phường/Xã",
          },
        ];
        responseJson.Result.results.map((item, index) => {
          const obj = {
            id: item.ID,
            name: item.TenDiaChi,
          };
          arrData.push(obj);
        });
        setPicker((prevState) => ({
          ...prevState,
          IDXaNS: arrData,
        }));
      })
      .catch((error) => {
        setPicker((prevState) => ({
          ...prevState,
          IDXaNS: [
            {
              id: "",
              name: "Chọn Phường/Xã",
            },
          ],
        }));
      });
  }, [data.IDHuyenNS]);
  //* Xã TT
  useEffect(() => {
    //! Cứ khi ID huyện thay đổi thì set id và picker xã về null
    changeValuePicker({ IDXaTT: "" });
    setPicker((prevState) => ({
      ...prevState,
      IDXaTT: [
        {
          id: "",
          name: "Chọn Phường/xã",
        },
      ],
    }));
    fetch(
      `http://tuyensinhvinhphuc.eduvi.vn/api/TSAPIService/getaddress?idParent=${data.IDHuyenTT}&level=3`
    )
      .then((response) => response.json())
      .then((responseJson) => {
        const arrData = [
          {
            id: "",
            name: "Chọn Phường/Xã",
          },
        ];
        responseJson.Result.results.map((item, index) => {
          const obj = {
            id: item.ID,
            name: item.TenDiaChi,
          };
          arrData.push(obj);
        });
        setPicker((prevState) => ({
          ...prevState,
          IDXaTT: arrData,
        }));
      })
      .catch((error) => {
        setPicker((prevState) => ({
          ...prevState,
          IDXaTT: [
            {
              id: "",
              name: "Chọn Phường/Xã",
            },
          ],
        }));
      });
  }, [data.IDHuyenTT]);
  //* Xã Tạm Trú
  useEffect(() => {
    //! Cứ khi ID huyện thay đổi thì set id và picker xã về null
    changeValuePicker({ IDXaTamTru: "" });
    setPicker((prevState) => ({
      ...prevState,
      IDXaTamTru: [
        {
          id: "",
          name: "Chọn Phường/xã",
        },
      ],
    }));
    fetch(
      `http://tuyensinhvinhphuc.eduvi.vn/api/TSAPIService/getaddress?idParent=${data.IDHuyenTamTru}&level=3`
    )
      .then((response) => response.json())
      .then((responseJson) => {
        const arrData = [
          {
            id: "",
            name: "Chọn Phường/Xã",
          },
        ];
        responseJson.Result.results.map((item, index) => {
          const obj = {
            id: item.ID,
            name: item.TenDiaChi,
          };
          arrData.push(obj);
        });
        setPicker((prevState) => ({
          ...prevState,
          IDXaTamTru: arrData,
        }));
      })
      .catch((error) => {
        setPicker((prevState) => ({
          ...prevState,
          IDXaTamTru: [
            {
              id: "",
              name: "Chọn Phường/Xã",
            },
          ],
        }));
      });
  }, [data.IDHuyenTamTru]);
  //* Xã
  useEffect(() => {
    //! Cứ khi ID huyện thay đổi thì set id và picker xã về null
    changeValuePicker({ IDXa: "" });
    setPicker((prevState) => ({
      ...prevState,
      IDXa: [
        {
          id: "",
          name: "Chọn Phường/xã",
        },
      ],
    }));
    fetch(
      `http://tuyensinhvinhphuc.eduvi.vn/api/TSAPIService/getaddress?idParent=${data.IDHuyen}&level=3`
    )
      .then((response) => response.json())
      .then((responseJson) => {
        const arrData = [
          {
            id: "",
            name: "Chọn Phường/Xã",
          },
        ];
        responseJson.Result.results.map((item, index) => {
          const obj = {
            id: item.ID,
            name: item.TenDiaChi,
          };
          arrData.push(obj);
        });
        setPicker((prevState) => ({
          ...prevState,
          IDXa: arrData,
        }));
      })
      .catch((error) => {
        setPicker((prevState) => ({
          ...prevState,
          IDXa: [
            {
              id: "",
              name: "Chọn Phường/Xã",
            },
          ],
        }));
      });
  }, [data.IDHuyen]);
  //* Xã CT
  useEffect(() => {
    //! Cứ khi ID huyện thay đổi thì set id và picker xã về null
    changeValuePicker({ IDXaCT: "" });
    setPicker((prevState) => ({
      ...prevState,
      IDXaCT: [
        {
          id: "",
          name: "Chọn Phường/xã",
        },
      ],
    }));
    fetch(
      `http://tuyensinhvinhphuc.eduvi.vn/api/TSAPIService/getaddress?idParent=${data.IDHuyenCT}&level=3`
    )
      .then((response) => response.json())
      .then((responseJson) => {
        const arrData = [
          {
            id: "",
            name: "Chọn Phường/Xã",
          },
        ];
        responseJson.Result.results.map((item, index) => {
          const obj = {
            id: item.ID,
            name: item.TenDiaChi,
          };
          arrData.push(obj);
        });
        setPicker((prevState) => ({
          ...prevState,
          IDXaCT: arrData,
        }));
      })
      .catch((error) => {
        setPicker((prevState) => ({
          ...prevState,
          IDXaCT: [
            {
              id: "",
              name: "Chọn Phường/Xã",
            },
          ],
        }));
      });
  }, [data.IDHuyenCT]);
  //#endregion
  //#region Đối tượng ưu tiên
  useEffect(() => {
    fetch(
      "http://tuyensinhvinhphuc.eduvi.vn/api/TSAPIService/getdoituonguutien"
    )
      .then((response) => response.json())
      .then((responseJson) => {
        const arrData = [];
        responseJson.Result.results.map((itemParent, indexParent) => {
          const obj = {
            TenLoai: itemParent.TenLoai,
            lstDanhSach: itemParent.lstDanhSach.map(
              (itemChild, indexChild) => ({
                ...itemChild,
                check: false,
              })
            ),
          };
          arrData.push(obj);
        });
        setDSdoituonguutien(arrData);
      })
      .catch((error) => setDSdoituonguutien([]));
  }, [0]);
  //#endregion

  //#endregion

  //#region Đối tượng ưu tiên
  const Check = (indexParent, indexChild, value) => {
    // console.log(typeof value);
    let arr = DSdoituonguutien.map(
      (item_DSdoituonguutien, index_DSdoituonguutien) =>
        index_DSdoituonguutien === indexParent
          ? {
              ...item_DSdoituonguutien,
              lstDanhSach: item_DSdoituonguutien.lstDanhSach.map(
                (lstDanhSach_item, lstDanhSach_index) =>
                  lstDanhSach_index === indexChild
                    ? {
                        ...lstDanhSach_item,
                        check: !value,
                      }
                    : lstDanhSach_item
              ),
            }
          : item_DSdoituonguutien
    );
    setDSdoituonguutien(arr);
  };
  //* Thêm loại ưu tiên *
  const Them = () => {
    let arr = [];
    DSdoituonguutien.map((item_DSdoituonguutien, index_DSdoituonguutien) =>
      item_DSdoituonguutien.lstDanhSach
        .filter((item) => item.check != false)
        .map((lstDanhSach_item, lstDanhSach_index) =>
          arr.push({ ID: lstDanhSach_item.ID, Ma: lstDanhSach_item.Ma })
        )
    );
    // console.log(arr);
    setData((prevState) => ({
      ...prevState,
      DoiTuongUuTien: arr,
    }));
  };
  //* View DS đối tượng ưu tiên
  const DSDoiTuongUuTien = () => {
    return DSdoituonguutien.map((itemParent, indexParent) => {
      return (
        <View
          style={{
            marginVertical: 10,
            flexDirection: "column",
          }}
          key={indexParent.toString()}
        >
          <Text
            style={{
              color: Colors.red500,
              fontWeight: "bold",
              paddingLeft: 2,
            }}
          >
            ● {itemParent.TenLoai}
          </Text>
          {itemParent.lstDanhSach.map((itemChild, indexChild) => {
            return (
              <TouchableOpacity
                key={indexChild.toString()}
                onPress={() => {
                  Check(indexParent, indexChild, itemChild.check);
                }}
              >
                <View
                  style={{
                    marginVertical: 5,
                    backgroundColor: "#FFFFFF",
                    width: "90%",
                    borderColor: "#f1f1f1",
                    padding: 5,
                    flexDirection: "row",
                    alignSelf: "center",
                    justifyContent: "flex-start",
                    padding: 5,
                    paddingRight: 10,
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 5,
                    },
                    shadowOpacity: 0.34,
                    shadowRadius: 6.27,

                    elevation: 10,
                  }}
                >
                  <CheckBox
                    style={{ alignSelf: "center" }}
                    checked={itemChild.check}
                    color={itemChild.check ? "#ff4646" : "#008577"}
                    onPress={() => {
                      Check(indexParent, indexChild, itemChild.check);
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 15,
                      flexShrink: 1,
                      textAlign: "justify",
                      flexGrow: 1,
                      paddingLeft: 15,
                    }}
                  >
                    {itemChild.Ma}-{itemChild.Ten}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      );
    });
  };
  //#endregion

  //#region API - Push: Đăng ký
  /* changeValuePicker({
   // MaHocSinh: "",
   // MatKhau: "",
   HoTen: "",
   NgaySinh: "",
   // Nơi sinh
   IDTinhNS: "",
   IDHuyenNS: "",
   IDXaNS: "",
   DiaChiNS: "",
   // Thường trú
   IDTinhTT: "",
   IDHuyenTT: "",
   IDXaTT: "",
   DiaChiTT: "",
   // Tạm trú
   IDTinhTamTru: "",
   IDHuyenTamTru: "",
   IDXaTamTru: "",
   DiaChiTamTru: "",
   // Nơi ở
   IDTinh: "",
   IDHuyen: "",
   IDXa: "",
   DiaChi: "",
   // Chương trình cấp dưới
   IDTinhCT: "",
   IDHuyenCT: "",
   IDXaCT: "",
   TenLopCT: "",
   NamHoanThanhCT: "",
   TenTruongCT: "",

   HanhKiem: "",
   HocLuc: "",

   CoGiaiThuongQuocGia: false,

   HoTen_Me: "",
   Tuoi_Me: "",
   DonViCongTac_Me: "",
   NgheNghiep_Me: "",
   SDT_Me: "",

   HoTen_Cha: "",
   Tuoi_Cha: "",
   DonViCongTac_Cha: "",
   NgheNghiep_Cha: "",
   SDT_Cha: "",

   HoTen_NGH: "",
   Tuoi_NGH: "",
   DonViCongTac_NGH: "",
   NgheNghiep_NGH: "",
   SDT_NGH: "",

   DienThoaiLienHe: "",
   MailLienHe: "",
   Xacnhanthongtin: false,
 }); */
  const [trangthai_DangKy, setTrangThai_DangKy] = useState(false);
  //* Đăng ký
  const DangKy = async () => {
    const lstDiemHocBa = [];
    data.HocBa.map((itemParent) => {
      itemParent.map((item) => {
        const _item = {
          IDMonThi: item.IDMonThi,
          Lop: item.Lop,
          Diem: XuLy_Xuat_DiemHocBa(item.Diem),
        };
        lstDiemHocBa.push(_item);
      });
    });
    const DataPush = {
      // MaHocSinh: data.MaHocSinh || "", //string
      // MatKhau: data.MatKhau || "", //string

      HoTen: data.HoTen || "", //string
      NgaySinh: date("{dd}/{mm}/{yyyy}", inputCon.date) || "", //string

      DanToc: data.DanToc || "", //string
      GioiTinh: data.GioiTinh, //bool
      // Nơi sinh
      IDTinhNS: parseInt(data.IDTinhNS, 10) || 0,
      IDHuyenNS: parseInt(data.IDHuyenNS, 10) || 0,
      // DiaChiNS: data.DiaChiNS || "diachiNS", //string

      //IDXaNS: parseInt(data.IDXaNS, 10) || 0,

      // Thường trú
      IDTinhTT: parseInt(data.IDTinhTT, 10) || 0,
      IDQuanTT: parseInt(data.IDHuyenTT, 10) || 0,
      IDPhuongTT: parseInt(data.IDXaTT, 10) || 0,
      DiaChiTT: data.DiaChiTT || "", //string
      NgayCap_ThuongTru:
        date("{dd}/{mm}/{yyyy}", inputThuongTru.date) !==
        date("{dd}/{mm}/{yyyy}", new Date())
          ? date("{dd}/{mm}/{yyyy}", inputThuongTru.date)
          : "",

      // Tạm trú
      IDTinhTamTru: parseInt(data.IDTinhTamTru, 10) || 0,
      IDQuanTamTru: parseInt(data.IDHuyenTamTru, 10) || 0,
      IDPhuongTamTru: parseInt(data.IDXaTamTru, 10) || 0,
      DiaChiTamTru: data.DiaChiTamTru || "", //string
      NgayCap_TamTru:
        parseInt(data.IDTinhTT, 10) !== 0 &&
        date("{dd}/{mm}/{yyyy}", inputThuongTru.date) !==
          date("{dd}/{mm}/{yyyy}", new Date())
          ? date("{dd}/{mm}/{yyyy}", inputTamTru.date)
          : "",

      // Nơi ở
      IDTinh: parseInt(data.IDTinh, 10) || 0,
      IDQuan: parseInt(data.IDHuyen, 10) || 0,
      IDPhuong: parseInt(data.IDXa, 10) || 0,
      DiaChi: data.DiaChi || "", //string
      // Chương trình tiểu học
      IDTinhCT: parseInt(data.IDTinhCT, 10) || 0,
      IDQuanCT: parseInt(data.IDHuyenCT, 10) || 0,
      IDPhuongCT: parseInt(data.IDXaCT, 10) || 0,
      TenLopCT: data.TenLopCT || "", //string
      TenTruongCT: data.TenTruongCT || "",
      NamHoanThanhCT: data.NamHoanThanhCT || 0,

      CoGiaiThuongQuocGia: data.CoGiaiThuongQuocGia,

      HocLuc: data.HocLuc || "", //string
      HanhKiem: data.HanhKiem || "", //string

      lstDiemHocBa: lstDiemHocBa || [],
      lstNguyenVong: data.NguyenVong || [],
      lstDoiTuongUuTien: data.DoiTuongUuTien || [],
      lstFileDinhKem: data.FileDinhKem || [],

      HoTenMe: data.HoTen_Me || "", //string
      // NamSinhMe: date("{dd}/{mm}/{yyyy}", inputMe.date), //string
      TuoiMe: data.Tuoi_Me || "",
      DonViCongTac_Me: data.DonViCongTac_Me || "", //string
      NgheNghiepMe: data.NgheNghiep_Me || "", //string
      SDTMe: data.SDT_Me || "", //string

      HoTenCha: data.HoTen_Cha || "", //string
      // NamSinhCha: date("{dd}/{mm}/{yyyy}", inputCha.date), //string
      TuoiCha: data.Tuoi_Cha || "",
      DonViCongTac_Cha: data.DonViCongTac_Cha || "", //string
      NgheNghiepCha: data.NgheNghiep_Cha || "", //string
      SDTCha: data.SDT_Cha || "", //string

      HoTenNguoiGiamHo: data.HoTen_NGH || "", //string
      // NamSinhNguoiGiamHo: date("{dd}/{mm}/{yyyy}", inputNGH.date), //string
      TuoiNGH: data.Tuoi_NGH || "",
      DonViCongTac_NGH: data.DonViCongTac_NGH || "", //string
      NgheNghiepNGH: data.NgheNghiep_NGH || "", //string
      SDTNGH: data.SDT_NGH || "", //string

      DienThoai: data.DienThoaiLienHe || "", //string
      Email: data.MailLienHe || "", //string

      IDKyThi: IDKyThi,
    };
    // console.log(DataPush);
    // console.log(JSON.stringify(DataPush));
    try {
      // Hiển thị trạng thái chờ
      setLoading(true);
      await fetch(
        "http://tuyensinhvinhphuc.eduvi.vn/api/TSAPIService/dangkytuyensinh",
        // "https://localhost:44384//api/TSAPIService/dangkytuyensinh",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify(DataPush),
        }
      )
        .then((response) => response.json())
        .then((responseJson) => {
          // console.log(responseJson.Result);
          // console.log(responseJson.Result.status);
          // console.log(responseJson.Result.message);

          // Tắt trạng thái chờ
          setLoading(false);
          responseJson.Result.status
            ? (showMessage({
                hideOnPress: true,
                onPress: () => navigation.goBack(),
                message: "Đăng ký thành công",
                description: `${responseJson.Result.message}`,
                duration: 8000,
                type: "success",
              }),
              setTrangThai_DangKy(true))
            : // ,setTimeout(() => {
              //   navigation.goBack();
              // }, 5000)
              showMessage({
                hideOnPress: true,
                message: "Đăng ký không thành công !",
                description: `${responseJson.Result.message}`,
                duration: 3000,
                type: "warning",
              });
        });
    } catch (e) {
      setLoading(false);

      showMessage({
        hideOnPress: true,
        message: "Thất bại",
        description: `${responseJson.Result.message}`,
        duration: 3000,
        type: "error",
      });
    }
  };
  //#endregion

  //#region Kiểm tra tất cả thông tin
  const TrangThai = () => {
    if ((data.IDTinhTamTru || data.IDHuyenTamTru || data.IDXaTamTru) !== "") {
      return (data.HoTen &&
        data.IDTinhNS &&
        data.IDTinhTT &&
        data.IDTinhTamTru &&
        data.IDTinh &&
        data.IDHuyenNS &&
        data.IDHuyenTT &&
        data.IDHuyenTamTru &&
        data.IDHuyen &&
        data.IDXaTT &&
        data.IDXaTamTru &&
        data.IDXa &&
        data.MailLienHe &&
        data.NguyenVong[0].IDTruong &&
        data.DanToc) !== "" &&
        data.Xacnhanthongtin &&
        data.FileDinhKem.length !== 0 &&
        data.DanToc !== "Chọn dân tộc" &&
        data.GioiTinh !== null
        ? true
        : false;
    } else {
      return (data.HoTen &&
        data.IDTinhNS &&
        data.IDTinhTT &&
        data.IDTinh &&
        data.IDHuyenNS &&
        data.IDHuyenTT &&
        data.IDHuyen &&
        data.IDXaTT &&
        data.IDXa &&
        data.MailLienHe &&
        data.NguyenVong[0].IDTruong &&
        data.DanToc) !== "" &&
        data.Xacnhanthongtin &&
        data.FileDinhKem.length !== 0 &&
        data.DanToc !== "Chọn dân tộc" &&
        data.GioiTinh !== null
        ? true
        : false;
    }
  };
  const ModalKiemTraThongTin = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modal_KiemTraVisible}
      >
        <BlurView
          style={[
            StyleSheet.absoluteFill,
            {
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 50,
            },
          ]}
          intensity={200}
        >
          <View
            style={{
              width: "95%",
              backgroundColor: "#eff8ff",
              borderRadius: 20,
              padding: 10,
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
          >
            <ScrollView
              nestedScrollEnabled
              style={{ maxHeight: 500, padding: 15 }}
            >
              <View
                style={{
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <View style={{ alignItems: "center" }}>
                  <Text
                    numberOfLines={1}
                    style={{
                      alignSelf: "center",
                      fontSize: 18,
                      color: "#045762",
                    }}
                  >
                    THÔNG TIN HỌC SINH
                  </Text>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View
                      style={{ flex: 1, height: 1, backgroundColor: "black" }}
                    />
                  </View>
                  {/* Dữ liệu */}
                  <View
                    style={{
                      marginBottom: "2%",
                      flexDirection: "row",
                      flexWrap: "wrap",
                      width: "100%",
                      justifyContent: "space-around",
                    }}
                  >
                    <View
                      style={{
                        borderWidth: 1,
                        alignItems: "flex-start",
                        justifyContent: "flex-start",
                        flexDirection: "column",
                      }}
                    >
                      {/*Mã học sinh*/}
                      <View
                        style={{
                          marginTop: "5%",
                          width: "100%",
                        }}
                      >
                        <Text style={{ fontSize: 16 }}>Mã học sinh:</Text>
                        <Text style={{ fontSize: 16 }}>{data.MaHocSinh}</Text>
                      </View>
                      {/*Mật khẩu*/}
                      <View style={{ marginTop: "5%", width: "100%" }}>
                        <Text style={{ fontSize: 16 }}>Mật khẩu:</Text>
                        <Text style={{ fontSize: 16 }}>{data.MatKhau}</Text>
                      </View>
                      {/*Họ tên*/}
                      <View style={{ marginTop: "5%", width: "100%" }}>
                        <Text style={{ fontSize: 16 }}>Họ tên:</Text>
                        <Text style={{ fontSize: 16 }}>{data.HoTen}</Text>
                      </View>
                      {/*Ngày sinh*/}
                      <View style={{ marginTop: "5%", width: "100%" }}>
                        <Text style={{ fontSize: 16 }}>Ngày sinh:</Text>
                        <Text style={{ fontSize: 16 }}>
                          {
                            //date("{dd}/{mm}/{yyyy}", inputCon.date)
                          }
                        </Text>
                      </View>
                      {/*Dân tộc*/}
                      <View style={{ marginTop: "5%", width: "100%" }}>
                        <Text style={{ fontSize: 16 }}>Dân tộc:</Text>
                        <Text style={{ fontSize: 16 }}>{data.DanToc}</Text>
                      </View>
                      {/*Giới tính*/}
                      <View style={{ marginTop: "5%", width: "100%" }}>
                        <Text style={{ fontSize: 16 }}>Giới tính:</Text>
                        <Text style={{ fontSize: 16 }}>{data.GioiTinh}</Text>
                      </View>
                      {/*Họ tên*/}
                      <View style={{ marginTop: "5%", width: "100%" }}>
                        <Text style={{ fontSize: 16 }}>Họ tên:</Text>
                        <Text style={{ fontSize: 16 }}>{data.HoTen}</Text>
                      </View>
                    </View>
                    <View
                      style={{
                        borderWidth: 1,
                        alignItems: "center",
                        justifyContent: "flex-start",
                        flexDirection: "column",
                      }}
                    >
                      {/*Quê quán*/}
                      <View
                        style={{
                          marginTop: "5%",
                          width: "100%",
                        }}
                      >
                        <Text style={{ fontSize: 16 }}>Quê quán:</Text>
                        <Text style={{ fontSize: 16 }}>a</Text>
                      </View>
                      {/*Ngày nộp hồ sơ*/}
                      <View style={{ marginTop: "5%", width: "100%" }}>
                        <Text style={{ fontSize: 16 }}>Ngày nộp hồ sơ:</Text>
                        <Text style={{ fontSize: 16 }}>a</Text>
                      </View>
                      {/*Trường đăng ký*/}
                      <View style={{ marginTop: "5%", width: "100%" }}>
                        <Text style={{ fontSize: 16 }}>Trường đăng ký:</Text>
                        <Text style={{ fontSize: 16 }}>a</Text>
                      </View>
                      {/*Trạng thái hồ sơ*/}
                      <View style={{ marginTop: "5%", width: "100%" }}>
                        <Text style={{ fontSize: 16 }}>Trạng thái hồ sơ:</Text>
                        <Text style={{ fontSize: 16 }}>a</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>
            <View
              style={{
                flexDirection: "row",
                width: "90%",
                justifyContent: "space-around",
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: "#F194FF",
                  borderRadius: 20,
                  padding: 10,
                  elevation: 2,
                  backgroundColor: "#2196F3",
                  width: "40%",
                }}
                onPress={() => {
                  setModal_KiemTraVisible(!modal_KiemTraVisible);
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Quay lại
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: "#F194FF",
                  borderRadius: 20,
                  padding: 10,
                  elevation: 2,
                  backgroundColor: "#2196F3",
                  width: "40%",
                }}
                onPress={() => DangKy()}
              >
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Đồng ý
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </BlurView>
      </Modal>
    );
  };
  //#endregion

  //#region Kiểm tra kết nối mạng
  const [connected, setConnected] = useState(true);
  useEffect(() => {
    const interval = setInterval(
      () =>
        NetInfo.fetch().then((state) => {
          setConnected(state.isConnected);
        }),
      3000
    );
    return () => {
      clearInterval(interval);
    };
  }, []);
  if (!connected) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#DEEBFE",
          paddingBottom: headerHeight,
        }}
      >
        <AnimatedEllipsis
          numberOfDots={3}
          minOpacity={0.4}
          animationDelay={200}
          style={{
            color: "#61b15a",
            fontSize: 100,
            letterSpacing: -15,
          }}
        />
        <Text>Vui lòng kiểm tra kết nối mạng</Text>
      </View>
    );
  }
  //#endregion

  return (
    <SafeAreaView
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#eff8ff",
      }}
    >
      {
        //Trạng thái chờ
        loading && (
          // <BlurView
          //   style={[
          //     StyleSheet.absoluteFill,
          //     {
          //       flex: 1,
          //       justifyContent: "center",
          //       alignItems: "center",
          //       position: "absolute",
          //       zIndex: 4000,
          //       paddingBottom: headerHeight,
          //     },
          //   ]}
          //   intensity={100}
          // >
          //   <AnimatedEllipsis
          //     numberOfDots={3}
          //     minOpacity={0.4}
          //     animationDelay={200}
          //     style={{
          //       color: "#61b15a",
          //       fontSize: 100,
          //       letterSpacing: -15,
          //     }}
          //   />
          // </BlurView>
          <View
            style={{
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              zIndex: 4000,
              paddingBottom: headerHeight,
              opacity: 0.5,
              backgroundColor: "black",
            }}
          >
            <AnimatedEllipsis
              numberOfDots={3}
              minOpacity={0.4}
              animationDelay={200}
              style={{
                color: "#61b15a",
                fontSize: 100,
                letterSpacing: -15,
              }}
            />
          </View>
        )
      }
      {
        // Trạng thái đăng ký
        trangthai_DangKy && (
          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
            <View
              style={{
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                zIndex: 4000,
                paddingBottom: headerHeight,
                opacity: 0.1,
                backgroundColor: "black",
              }}
            />
          </TouchableWithoutFeedback>
        )
      }
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#eff8ff",
        }}
      >
        <ScrollView keyboardDismissMode="on-drag">
          <View style={styles.container}>
            {/* -------------Đăng ký nguyện vọng------------- */}
            <View style={styles.block}>
              <View
                style={{
                  backgroundColor: "white",
                  paddingTop: 5,
                  borderColor: "white",
                  borderRadius: 15,

                  margin: 20,
                  padding: "5%",

                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 5,
                  },
                  shadowOpacity: 0.34,
                  shadowRadius: 6.27,

                  elevation: 10,
                }}
              >
                <View style={styles.title}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      color: "#145374",
                      flexGrow: 1,
                      textAlign: "center",
                    }}
                  >
                    Đăng ký nguyện vọng
                  </Text>
                </View>
                {/* Đăng ký nguyện vọng */}
                <View style={styles.box}>
                  {data.NguyenVong[0].IDTruong === "" && (
                    <IconButton
                      icon="menu-right"
                      color={Colors.red500}
                      size={30}
                      style={{ position: "absolute", left: -42, top: -1 }}
                    />
                  )}
                  <NV_MacDinh />
                  <ScrollView nestedScrollEnabled style={{ maxHeight: 400 }}>
                    <ListNV_Them />
                  </ScrollView>
                </View>
              </View>
            </View>
            {/* -------------Thông tin học sinh------------- */}
            <View style={styles.block}>
              <View
                style={{
                  backgroundColor: "white",
                  paddingTop: 5,
                  borderColor: "white",
                  borderRadius: 15,

                  margin: 20,
                  padding: "5%",

                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 5,
                  },
                  shadowOpacity: 0.34,
                  shadowRadius: 6.27,

                  elevation: 10,
                }}
              >
                <View style={styles.title}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      color: "#145374",
                      width: "100%",
                      textAlign: "center",
                    }}
                    // numberOfLines={1}
                  >
                    Thông tin học sinh
                  </Text>
                </View>
                <View style={styles.box}>
                  {/* Mã học sinh */}
                  <View style={[styles.field, { display: "none" }]}>
                    <Text>Mã học sinh</Text>
                    <TextInput
                      style={styles.textInput}
                      onChangeText={(value) =>
                        changeValuePicker({ MaHocSinh: value })
                      }
                    >
                      {data.MaHocSinh}
                    </TextInput>
                  </View>
                  {/* Mật khẩu */}
                  <View
                    style={[
                      styles.field,
                      { marginBottom: "5%", display: "none" },
                    ]}
                  >
                    <Text>Mật khẩu</Text>
                    <View
                      style={{
                        flexDirection: "row",
                        borderLeftWidth: 0.5,
                        borderBottomWidth: 0.5,
                      }}
                    >
                      <TextInput
                        style={{
                          flexGrow: 1,
                          alignSelf: "center",

                          fontSize: 18,

                          paddingLeft: 5,
                        }}
                        secureTextEntry={secureTextEntry}
                        onChangeText={(value) =>
                          changeValuePicker({ MatKhau: value })
                        }
                      >
                        {data.MatKhau}
                      </TextInput>
                      <IconButton
                        icon="eye"
                        color={Colors.red500}
                        size={18}
                        onPress={() => setSecureTextEntry(!secureTextEntry)}
                      />
                    </View>
                  </View>
                  {/* Họ và tên */}
                  <View style={styles.field}>
                    {data.HoTen === "" && (
                      <IconButton
                        icon="menu-right"
                        color={Colors.red500}
                        size={30}
                        style={{ position: "absolute", left: -42, top: -12 }}
                      />
                    )}
                    <Text>
                      Họ và tên <Text style={{ color: "red" }}>*</Text>
                    </Text>
                    <TextInput
                      style={styles.textInput}
                      onChangeText={(value) =>
                        changeValuePicker({ HoTen: value })
                      }
                    >
                      {data.HoTen}
                    </TextInput>
                  </View>
                  {/* Ngày sinh */}
                  <View
                    style={styles.field}
                    // style={{ display: "none" }}
                  >
                    {date("{dd}/{mm}/{yyyy}", inputCon.date) === "" && (
                      <IconButton
                        icon="menu-right"
                        color={Colors.red500}
                        size={30}
                        style={{ position: "absolute", left: -42, top: -12 }}
                      />
                    )}
                    <Text>
                      Ngày sinh <Text style={{ color: "red" }}>*</Text>
                    </Text>

                    <TouchableOpacity
                      style={{
                        flexDirection: "row",
                        borderLeftWidth: 0.5,
                        borderBottomWidth: 0.5,
                      }}
                      onPress={inputCon.showDatepicker}
                    >
                      <Text
                        style={{
                          flexGrow: 1,
                          alignSelf: "center",
                          fontSize: 18,
                          paddingLeft: 5,
                        }}
                      >
                        {date("{dd}/{mm}/{yyyy}", inputCon.date)}
                      </Text>
                      <IconButton
                        icon={
                          Platform.OS === "ios" && inputCon.show
                            ? "plus"
                            : "calendar"
                        }
                        color={Colors.red500}
                        size={18}
                        onPress={inputCon.showDatepicker}
                      />
                    </TouchableOpacity>

                    {inputCon.show && (
                      <DateTimePicker
                        testID="Con"
                        locale="vi-VI"
                        value={inputCon.date}
                        mode={inputCon.mode}
                        is24Hour={true}
                        display="spinner"
                        maximumDate={new Date()}
                        onChange={inputCon.onChange}
                      />
                    )}
                  </View>
                  {/* Dân tộc */}
                  <View style={styles.field}>
                    {data.DanToc === ("Chọn dân tộc" || "") && (
                      <IconButton
                        icon="menu-right"
                        color={Colors.red500}
                        size={30}
                        style={{ position: "absolute", left: -42, top: -12 }}
                      />
                    )}
                    <Text>
                      Dân tộc <Text style={{ color: "red" }}>*</Text>
                    </Text>
                    <Picker
                      selectedValue={data.DanToc}
                      iosIcon={
                        <IconButton
                          icon="menu-down"
                          color={"black"}
                          size={26}
                        />
                      }
                      // placeholder="Chọn dân tộc"
                      style={{ height: 50, width: "100%" }}
                      onValueChange={(itemValue, itemIndex) =>
                        changeValuePicker({ DanToc: itemValue })
                      }
                    >
                      {picker.DanToc.map((item, index) => {
                        return (
                          <Picker.Item
                            key={index.toString()}
                            label={item.name}
                            value={item.name}
                          />
                        );
                      })}
                    </Picker>
                  </View>
                  {/* Giới tính */}
                  <View style={styles.field}>
                    {data.GioiTinh === null && (
                      <IconButton
                        icon="menu-right"
                        color={Colors.red500}
                        size={30}
                        style={{ position: "absolute", left: -42, top: -12 }}
                      />
                    )}
                    <Text>Giới tính</Text>
                    <RadioButtonRN
                      data={[
                        {
                          label: "Nữ",
                          status: false,
                        },
                        {
                          label: "Nam",
                          status: true,
                        },
                      ]}
                      circleSize={10}
                      duration={100}
                      activeColor="#61b15a"
                      style={styles.radioButton}
                      selectedBtn={(e) =>
                        changeValuePicker({ GioiTinh: e.status })
                      }
                    />
                  </View>

                  {/*//? NƠI SINH ---------------------------------*/}
                  <View>
                    {(data.IDTinhNS && data.IDHuyenNS) === "" && (
                      <IconButton
                        icon="menu-right"
                        color={Colors.red500}
                        size={30}
                        style={{ position: "absolute", left: -42, top: -10 }}
                      />
                    )}
                    <Text
                      style={{ fontSize: 18, fontWeight: "bold", margin: "2%" }}
                    >
                      NƠI SINH :
                    </Text>
                  </View>
                  {/*// Tỉnh thành phố */}
                  <View style={styles.field}>
                    <Text>
                      Chọn tỉnh/thành phố{" "}
                      <Text style={{ color: "red" }}>*</Text>
                    </Text>
                    <Picker
                      selectedValue={data.IDTinhNS}
                      iosIcon={
                        <IconButton
                          icon="menu-down"
                          color={"black"}
                          size={26}
                        />
                      }
                      style={{ height: 50, width: "100%" }}
                      onValueChange={(itemValue, itemIndex) =>
                        changeValuePicker({ IDTinhNS: itemValue })
                      }
                    >
                      {picker.IDTinhNS.map((item, index) => {
                        return (
                          <Picker.Item
                            key={index.toString()}
                            label={item.name}
                            value={item.id}
                          />
                        );
                      })}
                    </Picker>
                  </View>
                  {/*// Quận huyện */}
                  <View style={styles.field}>
                    <Text>
                      Chọn quận/huyện <Text style={{ color: "red" }}>*</Text>
                    </Text>
                    <Picker
                      selectedValue={data.IDHuyenNS}
                      iosIcon={
                        <IconButton
                          icon="menu-down"
                          color={"black"}
                          size={26}
                        />
                      }
                      style={{ height: 50, width: "100%" }}
                      onValueChange={(itemValue, itemIndex) =>
                        changeValuePicker({ IDHuyenNS: itemValue })
                      }
                    >
                      {picker.IDHuyenNS.map((item, index) => {
                        return (
                          <Picker.Item
                            key={index.toString()}
                            label={item.name}
                            value={item.id}
                          />
                        );
                      })}
                    </Picker>
                  </View>
                  {/*// Ghi chú nơi sinh */}
                  <View style={styles.field}>
                    <Text>Ghi chú nơi sinh</Text>
                    <TextInput
                      style={styles.textInput}
                      onChangeText={(value) =>
                        changeValuePicker({ DiaChiNS: value })
                      }
                    >
                      {data.DiaChiNS}
                    </TextInput>
                  </View>
                  {/*//? HỘ KHẨU TẠM TRÚ ---------------------------------*/}
                  <View>
                    {data.IDTinhTamTru === "" ? null : (data.IDHuyenTamTru &&
                        data.IDXaTamTru) !== "" ? null : (
                      <IconButton
                        icon="menu-right"
                        color={Colors.red500}
                        size={30}
                        style={{ position: "absolute", left: -42, top: -10 }}
                      />
                    )}
                    <Text
                      style={{ fontSize: 18, fontWeight: "bold", margin: "2%" }}
                    >
                      HỘ KHẨU TẠM TRÚ :
                    </Text>
                  </View>
                  {/*// Tỉnh thành phố */}
                  <View style={styles.field}>
                    <Text>
                      Chọn tỉnh/thành phố{" "}
                      {data.IDTinhTamTru === "" ? null : (data.IDHuyenTamTru &&
                          data.IDXaTamTru) !== "" ? null : (
                        <Text style={{ color: "red" }}>*</Text>
                      )}
                    </Text>
                    <Picker
                      selectedValue={data.IDTinhTamTru}
                      iosIcon={
                        <IconButton
                          icon="menu-down"
                          color={"black"}
                          size={26}
                        />
                      }
                      style={{ height: 50, width: "100%" }}
                      onValueChange={(itemValue, itemIndex) =>
                        changeValuePicker({ IDTinhTamTru: itemValue })
                      }
                    >
                      {picker.IDTinhTamTru.map((item, index) => {
                        return (
                          <Picker.Item
                            key={index.toString()}
                            label={item.name}
                            value={item.id}
                          />
                        );
                      })}
                    </Picker>
                  </View>
                  {/*// Quận huyện */}
                  <View style={styles.field}>
                    <Text>
                      Chọn quận/huyện{" "}
                      {data.IDTinhTamTru === "" ? null : (data.IDHuyenTamTru &&
                          data.IDXaTamTru) !== "" ? null : (
                        <Text style={{ color: "red" }}>*</Text>
                      )}
                    </Text>
                    <Picker
                      selectedValue={data.IDHuyenTamTru}
                      iosIcon={
                        <IconButton
                          icon="menu-down"
                          color={"black"}
                          size={26}
                        />
                      }
                      style={{ height: 50, width: "100%" }}
                      onValueChange={(itemValue, itemIndex) =>
                        changeValuePicker({ IDHuyenTamTru: itemValue })
                      }
                    >
                      {picker.IDHuyenTamTru.map((item, index) => {
                        return (
                          <Picker.Item
                            key={index.toString()}
                            label={item.name}
                            value={item.id}
                          />
                        );
                      })}
                    </Picker>
                  </View>
                  {/*// Phường xã */}
                  <View style={styles.field}>
                    <Text>
                      Chọn phường/xã{" "}
                      {data.IDTinhTamTru === "" ? null : (data.IDHuyenTamTru &&
                          data.IDXaTamTru) !== "" ? null : (
                        <Text style={{ color: "red" }}>*</Text>
                      )}
                    </Text>
                    <Picker
                      selectedValue={data.IDXaTamTru}
                      iosIcon={
                        <IconButton
                          icon="menu-down"
                          color={"black"}
                          size={26}
                        />
                      }
                      style={{ height: 50, width: "100%" }}
                      onValueChange={(itemValue, itemIndex) =>
                        changeValuePicker({ IDXaTamTru: itemValue })
                      }
                    >
                      {picker.IDXaTamTru.map((item, index) => {
                        return (
                          <Picker.Item
                            key={index.toString()}
                            label={item.name}
                            value={item.id}
                          />
                        );
                      })}
                    </Picker>
                  </View>
                  {/*// Số nhà đường */}
                  <View style={styles.field}>
                    <Text>Số nhà, đường</Text>
                    <TextInput
                      style={styles.textInput}
                      onChangeText={(value) =>
                        changeValuePicker({ DiaChiTamTru: value })
                      }
                    >
                      {data.DiaChiTamTru}
                    </TextInput>
                  </View>
                  {/* Ngày tạm trú */}
                  <View
                    style={styles.field}
                    // style={{ display: "none" }}
                  >
                    <Text>
                      Ngày tạm trú{" "}
                      {data.IDTinhTamTru === "" ? null : (data.IDHuyenTamTru &&
                          data.IDXaTamTru) !== "" ? null : (
                        <Text style={{ color: "red" }}>*</Text>
                      )}
                    </Text>

                    <TouchableOpacity
                      style={{
                        flexDirection: "row",
                        borderLeftWidth: 0.5,
                        borderBottomWidth: 0.5,
                      }}
                      onPress={inputTamTru.showDatepicker}
                    >
                      <Text
                        style={{
                          flexGrow: 1,
                          alignSelf: "center",
                          fontSize: 18,
                          paddingLeft: 5,
                        }}
                      >
                        {date("{dd}/{mm}/{yyyy}", inputTamTru.date)}
                      </Text>
                      <IconButton
                        icon={
                          Platform.OS === "ios" && inputTamTru.show
                            ? "plus"
                            : "calendar"
                        }
                        color={Colors.red500}
                        size={18}
                        onPress={inputTamTru.showDatepicker}
                      />
                    </TouchableOpacity>

                    {inputTamTru.show && (
                      <DateTimePicker
                        testID="Con"
                        locale="vi-VI"
                        value={inputTamTru.date}
                        mode={inputTamTru.mode}
                        is24Hour={true}
                        display="spinner"
                        maximumDate={new Date()}
                        onChange={inputTamTru.onChange}
                      />
                    )}
                  </View>
                  {/*//? HỘ KHẨU THƯỜNG TRÚ ---------------------------------*/}
                  <View>
                    {(data.IDTinhTT && data.IDHuyenTT && data.IDXaTT) ===
                      "" && (
                      <IconButton
                        icon="menu-right"
                        color={Colors.red500}
                        size={30}
                        style={{ position: "absolute", left: -42, top: -10 }}
                      />
                    )}
                    <Text
                      style={{ fontSize: 18, fontWeight: "bold", margin: "2%" }}
                    >
                      HỘ KHẨU THƯỜNG TRÚ :
                    </Text>
                  </View>
                  {/*// Tỉnh thành phố */}
                  <View style={styles.field}>
                    <Text>
                      Chọn tỉnh/thành phố{" "}
                      <Text style={{ color: "red" }}>*</Text>
                    </Text>
                    <Picker
                      selectedValue={data.IDTinhTT}
                      iosIcon={
                        <IconButton
                          icon="menu-down"
                          color={"black"}
                          size={26}
                        />
                      }
                      style={{ height: 50, width: "100%" }}
                      onValueChange={(itemValue, itemIndex) =>
                        changeValuePicker({ IDTinhTT: itemValue })
                      }
                    >
                      {picker.IDTinhTT.map((item, index) => {
                        return (
                          <Picker.Item
                            key={index.toString()}
                            label={item.name}
                            value={item.id}
                          />
                        );
                      })}
                    </Picker>
                  </View>
                  {/*// Quận huyện */}
                  <View style={styles.field}>
                    <Text>
                      Chọn quận/huyện <Text style={{ color: "red" }}>*</Text>
                    </Text>
                    <Picker
                      selectedValue={data.IDHuyenTT}
                      iosIcon={
                        <IconButton
                          icon="menu-down"
                          color={"black"}
                          size={26}
                        />
                      }
                      style={{ height: 50, width: "100%" }}
                      onValueChange={(itemValue, itemIndex) =>
                        changeValuePicker({ IDHuyenTT: itemValue })
                      }
                    >
                      {picker.IDHuyenTT.map((item, index) => {
                        return (
                          <Picker.Item
                            key={index.toString()}
                            label={item.name}
                            value={item.id}
                          />
                        );
                      })}
                    </Picker>
                  </View>
                  {/*// Phường xã */}
                  <View style={styles.field}>
                    <Text>
                      Chọn phường/xã <Text style={{ color: "red" }}>*</Text>
                    </Text>
                    <Picker
                      selectedValue={data.IDXaTT}
                      iosIcon={
                        <IconButton
                          icon="menu-down"
                          color={"black"}
                          size={26}
                        />
                      }
                      style={{ height: 50, width: "100%" }}
                      onValueChange={(itemValue, itemIndex) =>
                        changeValuePicker({ IDXaTT: itemValue })
                      }
                    >
                      {picker.IDXaTT.map((item, index) => {
                        return (
                          <Picker.Item
                            key={index.toString()}
                            label={item.name}
                            value={item.id}
                          />
                        );
                      })}
                    </Picker>
                  </View>
                  {/*// Số nhà đường */}
                  <View style={styles.field}>
                    <Text>Số nhà, đường</Text>
                    <TextInput
                      style={styles.textInput}
                      onChangeText={(value) =>
                        changeValuePicker({ DiaChiTT: value })
                      }
                    >
                      {data.DiaChiTT}
                    </TextInput>
                  </View>
                  {/* Ngày thường trú */}
                  <View
                    style={styles.field}
                    // style={{ display: "none" }}
                  >
                    <Text>
                      Ngày thường trú <Text style={{ color: "red" }}>*</Text>
                    </Text>

                    <TouchableOpacity
                      style={{
                        flexDirection: "row",
                        borderLeftWidth: 0.5,
                        borderBottomWidth: 0.5,
                      }}
                      onPress={inputThuongTru.showDatepicker}
                    >
                      <Text
                        style={{
                          flexGrow: 1,
                          alignSelf: "center",
                          fontSize: 18,
                          paddingLeft: 5,
                        }}
                      >
                        {date("{dd}/{mm}/{yyyy}", inputThuongTru.date)}
                      </Text>
                      <IconButton
                        icon={
                          Platform.OS === "ios" && inputThuongTru.show
                            ? "plus"
                            : "calendar"
                        }
                        color={Colors.red500}
                        size={18}
                        onPress={inputThuongTru.showDatepicker}
                      />
                    </TouchableOpacity>

                    {inputThuongTru.show && (
                      <DateTimePicker
                        testID="Con"
                        locale="vi-VI"
                        value={inputThuongTru.date}
                        mode={inputThuongTru.mode}
                        is24Hour={true}
                        display="spinner"
                        maximumDate={new Date()}
                        onChange={inputThuongTru.onChange}
                      />
                    )}
                  </View>
                  {/*//? NƠI Ở HIỆN TẠI ---------------------------------*/}
                  <View>
                    {(data.IDTinh && data.IDHuyen && data.IDXa) === "" && (
                      <IconButton
                        icon="menu-right"
                        color={Colors.red500}
                        size={30}
                        style={{ position: "absolute", left: -42, top: -10 }}
                      />
                    )}
                    <Text
                      style={{ fontSize: 18, fontWeight: "bold", margin: "2%" }}
                    >
                      NƠI Ở HIỆN TẠI :
                    </Text>
                  </View>
                  {/*// Tỉnh thành phố */}
                  <View style={styles.field}>
                    <Text>
                      Chọn tỉnh/thành phố{" "}
                      <Text style={{ color: "red" }}>*</Text>
                    </Text>
                    <Picker
                      selectedValue={data.IDTinh}
                      iosIcon={
                        <IconButton
                          icon="menu-down"
                          color={"black"}
                          size={26}
                        />
                      }
                      style={{ height: 50, width: "100%" }}
                      onValueChange={(itemValue, itemIndex) =>
                        changeValuePicker({ IDTinh: itemValue })
                      }
                    >
                      {picker.IDTinh.map((item, index) => {
                        return (
                          <Picker.Item
                            key={index.toString()}
                            label={item.name}
                            value={item.id}
                          />
                        );
                      })}
                    </Picker>
                  </View>
                  {/*// Quận huyện */}
                  <View style={styles.field}>
                    <Text>
                      Chọn quận/huyện <Text style={{ color: "red" }}>*</Text>
                    </Text>
                    <Picker
                      selectedValue={data.IDHuyen}
                      iosIcon={
                        <IconButton
                          icon="menu-down"
                          color={"black"}
                          size={26}
                        />
                      }
                      style={{ height: 50, width: "100%" }}
                      onValueChange={(itemValue, itemIndex) =>
                        changeValuePicker({ IDHuyen: itemValue })
                      }
                    >
                      {picker.IDHuyen.map((item, index) => {
                        return (
                          <Picker.Item
                            key={index.toString()}
                            label={item.name}
                            value={item.id}
                          />
                        );
                      })}
                    </Picker>
                  </View>
                  {/*// Phường xã */}
                  <View style={styles.field}>
                    <Text>
                      Chọn phường/xã <Text style={{ color: "red" }}>*</Text>
                    </Text>
                    <Picker
                      selectedValue={data.IDXa}
                      iosIcon={
                        <IconButton
                          icon="menu-down"
                          color={"black"}
                          size={26}
                        />
                      }
                      style={{ height: 50, width: "100%" }}
                      onValueChange={(itemValue, itemIndex) =>
                        changeValuePicker({ IDXa: itemValue })
                      }
                    >
                      {picker.IDXa.map((item, index) => {
                        return (
                          <Picker.Item
                            key={index.toString()}
                            label={item.name}
                            value={item.id}
                          />
                        );
                      })}
                    </Picker>
                  </View>
                  {/*// Số nhà đường */}
                  <View style={styles.field}>
                    <Text>Số nhà, đường</Text>
                    <TextInput
                      style={styles.textInput}
                      onChangeText={(value) =>
                        changeValuePicker({ DiaChi: value })
                      }
                    >
                      {data.DiaChi}
                    </TextInput>
                  </View>
                </View>
              </View>
            </View>
            {/* -------------Học bạ------------- */}
            {DoiTuongTuyenSinh >= 2 && (
              <View style={styles.block}>
                <View
                  style={{
                    backgroundColor: "white",
                    paddingTop: 5,
                    borderColor: "white",
                    borderRadius: 15,

                    margin: 20,
                    padding: "5%",

                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 5,
                    },
                    shadowOpacity: 0.34,
                    shadowRadius: 6.27,

                    elevation: 10,
                  }}
                >
                  <View style={styles.title}>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        color: "#145374",
                        width: "100%",
                        textAlign: "center",
                      }}
                      // numberOfLines={1}
                    >
                      Học bạ
                    </Text>
                  </View>
                  <View style={styles.box}>
                    {DoiTuongTuyenSinh == 3 && (
                      <View>
                        {/* Học lực */}
                        <View style={styles.field}>
                          <Text>Hạnh kiểm</Text>
                          <Picker
                            selectedValue={data.HanhKiem}
                            style={{ height: 50, width: "100%" }}
                            onValueChange={(itemValue, itemIndex) =>
                              changeValuePicker({ HanhKiem: itemValue })
                            }
                          >
                            {picker.HanhKiem.map((item, index) => {
                              return (
                                <Picker.Item
                                  key={index.toString()}
                                  label={item.name}
                                  value={item.id}
                                />
                              );
                            })}
                          </Picker>
                        </View>
                        {/* Hạnh kiểm */}
                        <View style={styles.field}>
                          <Text>Học lực</Text>
                          <Picker
                            selectedValue={data.HocLuc}
                            style={{ height: 50, width: "100%" }}
                            onValueChange={(itemValue, itemIndex) =>
                              changeValuePicker({ HocLuc: itemValue })
                            }
                          >
                            {picker.HocLuc.map((item, index) => {
                              return (
                                <Picker.Item
                                  key={index.toString()}
                                  label={item.name}
                                  value={item.id}
                                />
                              );
                            })}
                          </Picker>
                        </View>
                      </View>
                    )}
                    <View style={styles.field}>
                      <Text style={{ marginBottom: 5 }}>Điểm học bạ</Text>
                      <Table
                        style={{ flexDirection: "column" }}
                        borderStyle={{ borderWidth: 1 }}
                      >
                        {/*---------Trên--------*/}
                        <TableWrapper style={{ flexDirection: "row" }}>
                          {/*----Trái----*/}
                          <TableWrapper
                            style={{
                              // flexGrow: 1,
                              width: "20%",
                            }}
                          >
                            <Cell
                              data="Lớp"
                              textStyle={styles.tableText}
                              style={styles.tableHead}
                            />
                          </TableWrapper>
                          {/*----Phải----*/}
                          <TableWrapper
                            style={{
                              // flexGrow: 4 ,
                              width: "80%",
                            }}
                          >
                            {
                              <Row
                                data={table.tableHead}
                                textStyle={styles.tableText}
                                style={styles.tableHead}
                              />
                            }
                          </TableWrapper>
                        </TableWrapper>
                        {/*---------Dưới--------*/}
                        <TableWrapper style={{ flexDirection: "row" }}>
                          {/*----Trái----*/}
                          <TableWrapper
                            style={{
                              // flexGrow: 1,
                              width: "20%",
                            }}
                          >
                            <Col
                              data={table.tableTitle}
                              textStyle={styles.tableText}
                              style={styles.tableBody}
                            />
                          </TableWrapper>
                          {/*----Phải----*/}
                          <TableWrapper
                            style={{
                              // flexGrow: 4 ,
                              width: "80%",
                            }}
                          >
                            {
                              // Các input được tạo theo thứ tự đối tượng lưu trữ ở data
                              data.HocBa.map((itemRow, indexRow) => (
                                <TableWrapper
                                  key={indexRow.toString()}
                                  style={{
                                    flexDirection: "row",
                                  }}
                                >
                                  {itemRow.map((itemCell, indexCell) => (
                                    <Cell
                                      key={indexCell.toString()}
                                      data={inputTable(
                                        indexRow,
                                        indexCell,
                                        itemCell
                                      )}
                                      textStyle={styles.tableText}
                                      style={[
                                        styles.tableBody,
                                        {
                                          width: 100 / itemRow.length + "%",
                                        },
                                      ]}
                                    />
                                  ))}
                                </TableWrapper>
                              ))
                            }
                          </TableWrapper>
                        </TableWrapper>
                      </Table>
                    </View>
                  </View>
                </View>
              </View>
            )}
            {/* -------------Chương trình câp dưới------------- */}
            {DoiTuongTuyenSinh === 2 && (
              <View style={styles.block}>
                <View
                  style={{
                    backgroundColor: "white",
                    paddingTop: 5,
                    borderColor: "white",
                    borderRadius: 15,

                    margin: 20,
                    padding: "5%",

                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 5,
                    },
                    shadowOpacity: 0.34,
                    shadowRadius: 6.27,

                    elevation: 10,
                  }}
                >
                  <View style={styles.title}>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        color: "#145374",
                        width: "100%",
                        textAlign: "center",
                      }}
                      // numberOfLines={1}
                    >
                      Hoàn thành chương trình tiểu học
                    </Text>
                  </View>
                  <View style={styles.box}>
                    {/*// Tỉnh thành phố */}
                    <View style={styles.field}>
                      <Text>Chọn tỉnh/thành phố</Text>
                      <Picker
                        selectedValue={data.IDTinhCT}
                        iosIcon={
                          <IconButton
                            icon="menu-down"
                            color={"black"}
                            size={26}
                          />
                        }
                        style={{ height: 50, width: "100%" }}
                        onValueChange={(itemValue, itemIndex) =>
                          changeValuePicker({ IDTinhCT: itemValue })
                        }
                      >
                        {picker.IDTinhCT.map((item, index) => {
                          return (
                            <Picker.Item
                              key={index.toString()}
                              label={item.name}
                              value={item.id}
                            />
                          );
                        })}
                      </Picker>
                    </View>
                    {/*// Quận huyện */}
                    <View style={styles.field}>
                      <Text>Chọn quận/huyện</Text>
                      <Picker
                        selectedValue={data.IDHuyenCT}
                        iosIcon={
                          <IconButton
                            icon="menu-down"
                            color={"black"}
                            size={26}
                          />
                        }
                        style={{ height: 50, width: "100%" }}
                        onValueChange={(itemValue, itemIndex) =>
                          changeValuePicker({ IDHuyenCT: itemValue })
                        }
                      >
                        {picker.IDHuyenCT.map((item, index) => {
                          return (
                            <Picker.Item
                              key={index.toString()}
                              label={item.name}
                              value={item.id}
                            />
                          );
                        })}
                      </Picker>
                    </View>
                    {/*// Phường xã */}
                    <View style={styles.field}>
                      <Text>Chọn phường/xã</Text>
                      <Picker
                        selectedValue={data.IDXaCT}
                        iosIcon={
                          <IconButton
                            icon="menu-down"
                            color={"black"}
                            size={26}
                          />
                        }
                        style={{ height: 50, width: "100%" }}
                        onValueChange={(itemValue, itemIndex) =>
                          changeValuePicker({ IDXaCT: itemValue })
                        }
                      >
                        {picker.IDXaCT.map((item, index) => {
                          return (
                            <Picker.Item
                              key={index.toString()}
                              label={item.name}
                              value={item.id}
                            />
                          );
                        })}
                      </Picker>
                    </View>
                    {/*// Tên lớp 5 */}
                    <View style={styles.field}>
                      <Text>Tên lớp 5</Text>
                      <TextInput
                        style={styles.textInput}
                        onChangeText={(value) =>
                          changeValuePicker({ TenLopCT: value })
                        }
                      >
                        {data.TenLopCT}
                      </TextInput>
                    </View>
                    {/*// Tên trường */}
                    <View style={styles.field}>
                      <Text>Tên trường</Text>
                      <TextInput
                        style={styles.textInput}
                        onChangeText={(value) =>
                          changeValuePicker({ TenTruongCT: value })
                        }
                      >
                        {data.TenTruongCT}
                      </TextInput>
                    </View>
                    {/*// Năm tốt nghiệp */}
                    <View style={styles.field}>
                      <Text>Năm tốt nghiệp</Text>
                      <TextInput
                        style={styles.textInput}
                        keyboardType={"number-pad"}
                        maxLength={4}
                        onChangeText={(value) =>
                          changeValuePicker({
                            NamHoanThanhCT: XuLy_Nhap_So(value),
                          })
                        }
                      >
                        {data.NamHoanThanhCT}
                      </TextInput>
                    </View>
                  </View>
                </View>
              </View>
            )}
            {/* -------------Chế độ ưu tiên------------- */}
            <View style={styles.block}>
              <View
                style={{
                  backgroundColor: "white",
                  paddingTop: 5,
                  borderColor: "white",
                  borderRadius: 15,

                  margin: 20,
                  padding: "5%",

                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 5,
                  },
                  shadowOpacity: 0.34,
                  shadowRadius: 6.27,

                  elevation: 10,
                }}
              >
                <View style={styles.title}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      color: "#145374",
                      width: "100%",
                      textAlign: "center",
                    }}
                  >
                    Chế độ ưu tiên
                  </Text>
                </View>
                <View style={styles.box}>
                  {/* Đối tượng ưu tiên */}
                  <View style={styles.field}>
                    <Text>Đối tượng ưu tiên</Text>
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                      <View
                        style={{
                          flexDirection: "row",
                          borderLeftWidth: 0.5,
                          borderBottomWidth: 0.5,
                        }}
                      >
                        <Text
                          style={{
                            flexGrow: 1,
                            alignSelf: "center",

                            fontSize: 18,

                            paddingLeft: 5,
                          }}
                        >
                          {data.DoiTuongUuTien.length} mục đã chọn
                        </Text>
                        <IconButton
                          icon="file"
                          color={Colors.red500}
                          size={20}
                          onPress={() => setModalVisible(true)}
                        />
                      </View>
                    </TouchableOpacity>
                    <Modal
                      animationType="slide"
                      transparent={true}
                      visible={modalVisible}
                    >
                      <BlurView
                        style={[
                          StyleSheet.absoluteFill,
                          {
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            paddingTop: 0,
                          },
                        ]}
                        intensity={200}
                      >
                        <View
                          style={{
                            width: "95%",
                            height: (height * 80) / 100,
                            backgroundColor: "#eff8ff",
                            borderRadius: 20,
                            padding: 10,
                            alignItems: "center",
                            shadowColor: "#000",
                            shadowOffset: {
                              width: 0,
                              height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 5,
                          }}
                        >
                          <ScrollView
                            nestedScrollEnabled
                            style={
                              {
                                // maxHeight: (height * 70) / 100,
                                // padding: 20,
                              }
                            }
                          >
                            <View
                              style={{
                                flex: 1,
                                paddingVertical: 20,
                                paddingBottom: 60,
                              }}
                            >
                              <DSDoiTuongUuTien />
                            </View>
                          </ScrollView>

                          <Button
                            primary
                            style={{
                              marginTop: 10,
                              borderRadius: 25,
                              alignSelf: "center",
                            }}
                            onPress={() => {
                              setModalVisible(!modalVisible);
                              Them();
                            }}
                          >
                            <Text>
                              {!DSdoituonguutien.some(
                                (i) =>
                                  i.lstDanhSach.some((i) => i.check == true) ==
                                  true
                              )
                                ? "Đóng"
                                : "Chấp nhận"}
                            </Text>
                          </Button>
                        </View>
                      </BlurView>
                    </Modal>

                    {/* Checkbox */}
                    <TouchableOpacity
                      onPress={() =>
                        setData((prevState) => ({
                          ...prevState,
                          CoGiaiThuongQuocGia: !prevState.CoGiaiThuongQuocGia,
                        }))
                      }
                    >
                      <View
                        style={{
                          margin: 5,
                          backgroundColor: "#FFFFFF",
                          width: "100%",
                          padding: 5,
                          borderColor: "#f1f1f1",
                          alignItems: "stretch",
                          flexDirection: "row",
                          alignSelf: "center",
                          shadowColor: "#000",
                          shadowOffset: {
                            width: 0,
                            height: 5,
                          },
                          shadowOpacity: 0.34,
                          shadowRadius: 6.27,

                          elevation: 10,
                        }}
                      >
                        <CheckBox
                          checked={data.CoGiaiThuongQuocGia}
                          color={
                            data.CoGiaiThuongQuocGia ? "#ff4646" : "#008577"
                          }
                          onPress={() =>
                            setData((prevState) => ({
                              ...prevState,
                              CoGiaiThuongQuocGia:
                                !prevState.CoGiaiThuongQuocGia,
                            }))
                          }
                        />
                        <Text
                          style={{
                            fontSize: 14,
                            alignSelf: "center",
                            paddingLeft: 15,
                          }}
                        >
                          Có giải thưởng cấp quốc gia
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={[
                      styles.field,
                      //  { display: "none" }
                    ]}
                  >
                    {data.FileDinhKem.length === 0 && (
                      <IconButton
                        icon="menu-right"
                        color={Colors.red500}
                        size={30}
                        style={{ position: "absolute", left: -42, top: -12 }}
                      />
                    )}
                    <Text>
                      Bổ sung các giấy tờ liên quan
                      <Text style={{ color: "red" }}> *</Text>
                    </Text>
                    <TouchableOpacity
                      style={{
                        marginTop: 5,
                        alignItems: "center",
                        backgroundColor: "#fff5c0",
                        flexDirection: "row",
                        justifyContent: "center",
                      }}
                      onPress={() => HienThi_ModalMinhChung()}
                    >
                      <IconButton
                        icon="camera"
                        color={Colors.red500}
                        size={25}
                        // onPress={() => {
                        //   const lstDiemHocBa = [];
                        //   data.HocBa.map((itemParent) => {
                        //     itemParent.map((item) => {
                        //       const _item = {
                        //         ...item,
                        //         Diem: XuLy_Xuat_DiemHocBa(item.Diem),
                        //       };
                        //       lstDiemHocBa.push(_item);
                        //     });
                        //   });
                        //   console.log(lstDiemHocBa);
                        // }}
                        onPress={() => HienThi_ModalMinhChung()}
                      />
                      <Text>{`Đã chọn ${data.FileDinhKem.length} ảnh`}</Text>
                    </TouchableOpacity>
                    <Modal
                      animationType="slide"
                      transparent={true}
                      visible={modal_MinhChung}
                    >
                      <BlurView
                        style={[
                          StyleSheet.absoluteFill,
                          {
                            flex: 1,
                            justifyContent: "flex-end",
                            alignItems: "center",
                          },
                        ]}
                        intensity={200}
                      >
                        <View
                          style={{
                            width: "100%",
                            height: "100%",
                            backgroundColor: "#FFF",
                            alignItems: "center",
                            flexDirection: "column",
                            paddingVertical: statusBarHeight,
                          }}
                        >
                          <FileDinhKem
                            {...{
                              loaiminhchung,
                              loaiminhchung_cache,
                              setLoaiMinhChung,
                              changeValuePicker,
                              setModal_MinhChung,
                            }}
                          />
                        </View>
                      </BlurView>
                    </Modal>
                  </View>
                </View>
              </View>
            </View>
            {/* -------------Thông tin cha mẹ, người giám hộ------------- */}
            <View style={styles.block}>
              <View
                style={{
                  backgroundColor: "white",
                  paddingTop: 5,
                  borderColor: "white",
                  borderRadius: 15,

                  margin: 20,
                  padding: "5%",

                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 5,
                  },
                  shadowOpacity: 0.34,
                  shadowRadius: 6.27,

                  elevation: 10,
                }}
              >
                <View style={styles.title}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      color: "#145374",
                      width: "100%",
                      textAlign: "center",
                    }}
                  >
                    Thông tin cha mẹ, người giám hộ
                  </Text>
                </View>
                <View style={styles.box}>
                  {/*//? THÔNG TIN MẸ ---------------------------------*/}
                  <Text
                    style={{ fontSize: 18, fontWeight: "bold", margin: "2%" }}
                  >
                    THÔNG TIN MẸ :
                  </Text>
                  {/* Họ và tên */}
                  <View style={styles.field}>
                    <Text>Họ và tên</Text>
                    <TextInput
                      style={styles.textInput}
                      onChangeText={(value) =>
                        changeValuePicker({ HoTen_Me: value })
                      }
                    >
                      {data.HoTen_Me}
                    </TextInput>
                  </View>
                  {/* Đơn vị công tác */}
                  <View style={styles.field}>
                    <Text>Đơn vị công tác</Text>
                    <TextInput
                      style={styles.textInput}
                      onChangeText={(value) =>
                        changeValuePicker({ DonViCongTac_Me: value })
                      }
                    >
                      {data.DonViCongTac_Me}
                    </TextInput>
                  </View>
                  {/* Tuổi*/}
                  <View style={styles.field}>
                    <Text>Tuổi</Text>
                    <View
                      style={{
                        flexDirection: "row",
                      }}
                    >
                      <TextInput
                        // style={{
                        //   flexGrow: 1,
                        //   alignSelf: "center",

                        //   fontSize: 18,

                        //   paddingLeft: 5,
                        // }}
                        style={styles.textInput}
                        keyboardType={"number-pad"}
                        multiline={false}
                        maxLength={2}
                        onChangeText={(value) =>
                          changeValuePicker({ Tuoi_Me: XuLy_Nhap_So(value) })
                        }
                      >
                        {
                          //date("{dd}/{mm}/{yyyy}", inputMe.date)
                          data.Tuoi_Me
                        }
                      </TextInput>
                      {/* <IconButton
                        icon="calendar"
                        color={Colors.red500}
                        size={18}
                        onPress={inputMe.showDatepicker}
                      />
                      {inputMe.show && (
                        <DateTimePicker
                          testID="Me"
                          value={inputMe.date}
                          mode={inputMe.mode}
                          is24Hour={true}
                          display="default"
                          onChange={inputMe.onChange}
                        />
                      )} */}
                    </View>
                  </View>
                  {/* Nghề nghiệp */}
                  <View style={styles.field}>
                    <Text>Nghề nghiệp</Text>
                    <TextInput
                      style={styles.textInput}
                      onChangeText={(value) =>
                        changeValuePicker({ NgheNghiep_Me: value })
                      }
                    >
                      {data.NgheNghiep_Me}
                    </TextInput>
                  </View>
                  {/* Số điện thoại */}
                  <View style={styles.field}>
                    <Text>Số điện thoại</Text>
                    <TextInput
                      style={styles.textInput}
                      keyboardType={"number-pad"}
                      multiline={false}
                      onChangeText={(value) =>
                        changeValuePicker({ SDT_Me: XuLy_Nhap_So(value) })
                      }
                    >
                      {data.SDT_Me}
                    </TextInput>
                  </View>
                  {/*//? THÔNG TIN CHA ---------------------------------*/}
                  <Text
                    style={{ fontSize: 18, fontWeight: "bold", margin: "2%" }}
                  >
                    THÔNG TIN CHA :
                  </Text>
                  {/* Họ và tên */}
                  <View style={styles.field}>
                    <Text>Họ và tên</Text>
                    <TextInput
                      style={styles.textInput}
                      onChangeText={(value) =>
                        changeValuePicker({ HoTen_Cha: value })
                      }
                    >
                      {data.HoTen_Cha}
                    </TextInput>
                  </View>
                  {/* Đơn vị công tác */}
                  <View style={styles.field}>
                    <Text>Đơn vị công tác</Text>
                    <TextInput
                      style={styles.textInput}
                      onChangeText={(value) =>
                        changeValuePicker({ DonViCongTac_Cha: value })
                      }
                    >
                      {data.DonViCongTac_Cha}
                    </TextInput>
                  </View>
                  {/* Tuổi */}
                  <View style={styles.field}>
                    <Text>Tuổi</Text>
                    <View
                      style={{
                        flexDirection: "row",
                      }}
                    >
                      <TextInput
                        // style={{
                        //   flexGrow: 1,
                        //   alignSelf: "center",

                        //   fontSize: 18,

                        //   paddingLeft: 5,
                        // }}
                        style={styles.textInput}
                        keyboardType={"number-pad"}
                        multiline={false}
                        maxLength={2}
                        onChangeText={(value) =>
                          changeValuePicker({ Tuoi_Cha: XuLy_Nhap_So(value) })
                        }
                      >
                        {
                          //date("{dd}/{mm}/{yyyy}", inputCha.date)
                          data.Tuoi_Cha
                        }
                      </TextInput>
                      {/* <IconButton
                        icon="calendar"
                        color={Colors.red500}
                        size={18}
                        onPress={inputCha.showDatepicker}
                      />
                      {inputCha.show && (
                        <DateTimePicker
                          testID="Me"
                          value={inputCha.date}
                          mode={inputCha.mode}
                          is24Hour={true}
                          display="default"
                          onChange={inputCha.onChange}
                        />
                      )} */}
                    </View>
                  </View>
                  {/* Nghề nghiệp */}
                  <View style={styles.field}>
                    <Text>Nghề nghiệp</Text>
                    <TextInput
                      style={styles.textInput}
                      onChangeText={(value) =>
                        changeValuePicker({ NgheNghiep_Cha: value })
                      }
                    >
                      {data.NgheNghiep_Cha}
                    </TextInput>
                  </View>
                  {/* Số điện thoại */}
                  <View style={styles.field}>
                    <Text>Số điện thoại</Text>
                    <TextInput
                      style={styles.textInput}
                      keyboardType={"number-pad"}
                      multiline={false}
                      onChangeText={(value) =>
                        changeValuePicker({ SDT_Cha: XuLy_Nhap_So(value) })
                      }
                    >
                      {data.SDT_Cha}
                    </TextInput>
                  </View>
                  {/*//? THÔNG TIN NGƯỜI GIÁM HỘ ---------------------------------*/}
                  <Text
                    style={{ fontSize: 18, fontWeight: "bold", margin: "2%" }}
                  >
                    THÔNG TIN NGƯỜI GIÁM HỘ :
                  </Text>
                  {/* Họ và tên */}
                  <View style={styles.field}>
                    <Text>Họ và tên</Text>
                    <TextInput
                      style={styles.textInput}
                      onChangeText={(value) =>
                        changeValuePicker({ HoTen_NGH: value })
                      }
                    >
                      {data.HoTen_NGH}
                    </TextInput>
                  </View>
                  {/* Đơn vị công tác*/}
                  <View style={styles.field}>
                    <Text>Đơn vị công tác</Text>
                    <TextInput
                      style={styles.textInput}
                      onChangeText={(value) =>
                        changeValuePicker({ DonViCongTac_NGH: value })
                      }
                    >
                      {data.DonViCongTac_NGH}
                    </TextInput>
                  </View>
                  {/* Tuỏi */}
                  <View style={styles.field}>
                    <Text>Tuổi</Text>
                    <View
                      style={{
                        flexDirection: "row",
                      }}
                    >
                      <TextInput
                        // style={{
                        //   flexGrow: 1,
                        //   alignSelf: "center",

                        //   fontSize: 18,

                        //   paddingLeft: 5,
                        // }}
                        style={styles.textInput}
                        keyboardType={"number-pad"}
                        multiline={false}
                        maxLength={2}
                        onChangeText={(value) =>
                          changeValuePicker({ Tuoi_NGH: XuLy_Nhap_So(value) })
                        }
                      >
                        {
                          //date("{dd}/{mm}/{yyyy}", inputNGH.date)
                          data.Tuoi_NGH
                        }
                      </TextInput>
                      {/* <IconButton
                        icon="calendar"
                        color={Colors.red500}
                        size={18}
                        onPress={inputNGH.showDatepicker}
                      />
                      {inputNGH.show && (
                        <DateTimePicker
                          testID="Me"
                          value={inputNGH.date}
                          mode={inputNGH.mode}
                          is24Hour={true}
                          display="default"
                          onChange={inputNGH.onChange}
                        />
                      )} */}
                    </View>
                  </View>
                  {/* Nghề nghiệp */}
                  <View style={styles.field}>
                    <Text>Nghề nghiệp</Text>
                    <TextInput
                      style={styles.textInput}
                      onChangeText={(value) =>
                        changeValuePicker({ NgheNghiep_NGH: value })
                      }
                    >
                      {data.NgheNghiep_NGH}
                    </TextInput>
                  </View>
                  {/* Số điện thoại */}
                  <View style={styles.field}>
                    <Text>Số điện thoại</Text>
                    <TextInput
                      style={styles.textInput}
                      keyboardType={"number-pad"}
                      multiline={false}
                      onChangeText={(value) =>
                        changeValuePicker({ SDT_NGH: XuLy_Nhap_So(value) })
                      }
                    >
                      {data.SDT_NGH}
                    </TextInput>
                  </View>
                </View>
              </View>
            </View>
            {/* -------------Thông tin liên lạc------------- */}
            <View style={styles.block}>
              <View
                style={{
                  backgroundColor: "white",
                  paddingTop: 5,
                  borderColor: "white",
                  borderRadius: 15,

                  margin: 20,
                  padding: "5%",

                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 5,
                  },
                  shadowOpacity: 0.34,
                  shadowRadius: 6.27,

                  elevation: 10,
                }}
              >
                <View style={styles.title}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      color: "#145374",
                      width: "100%",
                      textAlign: "center",
                    }}
                  >
                    Thông tin liên lạc
                  </Text>
                </View>
                <View style={styles.box}>
                  {/*//? THÔNG TIN LIÊN LẠC ---------------------------------*/}
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "bold",
                      margin: "2%",
                      fontStyle: "italic",
                    }}
                  >
                    Vui lòng nhập số điện thoại và địa chỉ email để cơ quan chức
                    năng liên hệ với ông/bà khi có kết quả.
                  </Text>
                  {/* Điện thoại liên hệ */}
                  <View style={styles.field}>
                    <Text>Điện thoại liên hệ</Text>
                    <TextInput
                      style={styles.textInput}
                      keyboardType={"number-pad"}
                      multiline={false}
                      maxLength={11}
                      onChangeText={(value) =>
                        changeValuePicker({
                          DienThoaiLienHe: XuLy_Nhap_So(value),
                        })
                      }
                    >
                      {data.DienThoaiLienHe}
                    </TextInput>
                  </View>

                  {/* Email liên hệ */}
                  <View style={styles.field}>
                    {data.MailLienHe === "" && (
                      <IconButton
                        icon="menu-right"
                        color={Colors.red500}
                        size={30}
                        style={{ position: "absolute", left: -42, top: -12 }}
                      />
                    )}
                    <Text>
                      Email liên hệ <Text style={{ color: "red" }}>*</Text>
                    </Text>
                    <TextInput
                      style={styles.textInput}
                      placeholder="email@gmail.com"
                      keyboardType={"email-address"}
                      multiline={false}
                      onChangeText={(value) =>
                        changeValuePicker({ MailLienHe: value })
                      }
                    >
                      {data.MailLienHe}
                    </TextInput>
                  </View>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "bold",
                      margin: "2%",
                      fontStyle: "italic",
                    }}
                  >
                    Sau khi phụ huynh học sinh đăng ký tuyển sinh đầu cấp thành
                    công ngoài việc nhận giấy báo nhập học qua email đăng ký,
                    phụ huynh học sinh có thể in/tải giấy báo nhập học tại trang
                    web tuyensinhedu.huongvietedm.vn ở chức năng TRA CỨU KẾT QUẢ
                    TUYỂN SINH.
                  </Text>
                </View>
              </View>
            </View>
            {/* -------------Cam kết khai báo đúng thông tin------------- */}
            <View style={[styles.block, { width: "94%", borderRadius: 10 }]}>
              <View style={styles.box}>
                <View style={[styles.field, { borderWidth: 0 }]}>
                  {/* Checkbox */}
                  <TouchableOpacity
                    onPress={() =>
                      setData((prevState) => ({
                        ...prevState,
                        Xacnhanthongtin: !prevState.Xacnhanthongtin,
                      }))
                    }
                  >
                    <View
                      style={{
                        borderRadius: 10,
                        margin: 5,
                        backgroundColor: "#FFFFFF",
                        width: "100%",
                        padding: 5,
                        borderColor: "#f1f1f1",
                        alignItems: "stretch",
                        flexDirection: "row",
                        alignSelf: "center",
                        shadowColor: "#000",
                        shadowOffset: {
                          width: 0,
                          height: 5,
                        },
                        shadowOpacity: 0.34,
                        shadowRadius: 6.27,

                        elevation: 10,
                      }}
                    >
                      <CheckBox
                        checked={data.Xacnhanthongtin}
                        color={data.Xacnhanthongtin ? "#ff4646" : "#008577"}
                        // onValueChange={setData(false)}
                        onPress={() =>
                          setData((prevState) => ({
                            ...prevState,
                            Xacnhanthongtin: !prevState.Xacnhanthongtin,
                          }))
                        }
                      />
                      <Text
                        style={{
                          fontSize: 14,
                          alignSelf: "center",
                          paddingLeft: 15,
                        }}
                      >
                        Tôi xin cam kết khai báo đúng thông tin
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View
              style={{
                height: 50,
                marginBottom: 20,
                width: "100%",
                alignItems: "center",
              }}
            >
              {TrangThai() && (
                <View>
                  <Button
                    success
                    style={styles.button}
                    onPress={() => DangKy()}
                  >
                    <Text>Đăng ký</Text>
                  </Button>
                  <ModalKiemTraThongTin />
                </View>
              )}
            </View>
          </View>
        </ScrollView>
        <FlashMessage
          autoHide={true}
          position="top"
          statusBarHeight={0}
          style={
            {
              //borderWidth: 1,
            }
          }
          titleStyle={{
            marginTop: -10,
            padding: 10,
            fontSize: 20,
            textAlign: "center",
            alignSelf: "center",
          }}
          textStyle={{
            fontSize: 16,
            textAlign: "center",
          }}
        />
        {!TrangThai() && (
          <View
            style={{
              position: "absolute",
              left: 20,
              right: 20,
              bottom: 10,
              zIndex: 1,
              borderRadius: 15,
              paddingVertical: 5,
              paddingHorizontal: 15,

              backgroundColor: "#fff5c0",

              borderWidth: 2,
              borderColor: "#e6db9fc9",

              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 5,
              },
              shadowOpacity: 0.34,
              shadowRadius: 6.27,

              elevation: 10,
            }}
          >
            <Text
              style={{
                fontSize: 12.5,
                fontWeight: "bold",
                // color: "#ff4646",
                color: "red",
                textAlign: "center",
              }}
            >
              Lưu ý: Chỉ có thể đăng ký khi các thông tin bắt buộc{" "}
              <Text
                style={{
                  fontSize: 13.5,
                  fontWeight: "bold",
                  color: "red",
                  textAlign: "center",
                }}
              >
                (có dấu *)
              </Text>{" "}
              được điền đầy đủ
            </Text>
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  //? Phân cấp View : container > block = title > box > field(...element)
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    backgroundColor: "#DEEBFE",
  },
  block: {
    // borderWidth: 1,

    backgroundColor: "#DEEBFE",
    width: "100%",
  },
  title: {
    width: "100%",

    borderRadius: 15,
    // left: "10%",
    alignSelf: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: 2,
    paddingRight: 2,
    paddingBottom: 5,
    marginBottom: 10,
  },
  box: {
    // borderColor: "red",
    // borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  field: {
    borderColor: "white",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    padding: 5,
    marginBottom: "1%",
  },
  textInput: {
    fontSize: 18,
    borderLeftWidth: 0.5,
    borderBottomWidth: 0.5,
    paddingLeft: 5,
    flexGrow: 1,
  },
  //? Dropdown
  dropDownStyle: {
    backgroundColor: "#e8e8e8",
    borderColor: "#222831",
    borderWidth: 1,
  },
  labelStyle: {
    fontSize: 16,
    textAlign: "left",
    color: "#000",
  },
  button: {
    height: 50,
    borderRadius: 25,
    textShadowColor: "#bbbbbb",

    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 13 },
  },

  tableHead: { height: 50, backgroundColor: "#cee5d0" },
  tableText: { textAlign: "center", fontWeight: "bold" },
  tableTitle: { backgroundColor: "#f6f8fa" },
  tableBody: { height: 50, backgroundColor: "#ffeedb" },
  lst_imgs: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  img: {
    // height: width / 5,
    // width: width / 5,
    width: (width - 2 * 4 * 2) / 4,
    height: (width - 2 * 4 * 2) / 4,
    margin: 2,
  },
});
