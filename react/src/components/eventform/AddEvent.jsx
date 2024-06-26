import { useRef, useState } from "react";
import Photo from "../../assets/images/imgEvent/photo.png";
import IconTicket from "../../assets/images/imgEvent/iconTicket.png";
import Breadcrumb from "../breadcrumbAdmin/Breadcrumbs";
import Button from "../../assets/images/imgEvent/button.png";
import DateEvent from "../../assets/images/imgEvent/dateEvent.png";
import Location from "../../assets/images/imgEvent/location.png";


export default function AddEvent() {

  const [formDataEvent, setFormDataEvent] = useState({
    name: "",
    description: "",
    category_id: "",
    date: "",
    location: {
      building:"",
      province: "",
      address: "",
      city: "",
      postal_code: "",
    },
    prices: {
      price: "",
      ticket_type_id: "",
      no_of_ticket: "", 
      publish: "",
      end_publish: "",
    }
  }); 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateFormData(formDataEvent);
    if (validationError) {
      console.error("Validation Error:", validationError);
      return;
    }
    const data = new FormData();
    data.append("name", formDataEvent.name);
    data.append("description", formDataEvent.description);
    data.append("username", formDataEvent.category_id);
    data.append("first_name", formDataEvent.date);
    data.append("last_name", formDataEvent.last_name);
    data.append("is_super_admin", formDataEvent.is_super_admin);
    data.append("password", formDataEvent.password);

    try {
      const response = await axios.post(
        "https://kreasinusantara.shop/api/v1/admin/register",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Success:", response.data, response);
      navigate("/dashboard/manage-admin");
      
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };
  const [imageBlob, setImageBlob] = useState();
  const navigate = useNavigate();
  const handleCancel = () => {
    navigate("/dashboard/manage-admin");
  };


  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleFileUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <section className="section-Event">
       <Breadcrumb />

        <div className="w-[1156px] h-[1979px] gap-[50px] mx-auto mt-14 font-poppins ">
          <h1 className="w-[242px] h-[48px] text-[32px] leading-[48px] font-semibold text-primary-0">
            Add new event
          </h1>
          <div className="event-information shadow-custom-1 shadow-custom-2 mt-20">
            <h1 className="w-[328px] h-[48px] text-[32px] leading-[48px] font-semibold text-primary-0 mb-10">
              Event Information
            </h1>
            <div className="flex flex-row items-start justify-between w-[1112px] h-[142px] gap-[149px]">
              <div className="flex flex-col gap-[18px] w-[360px] h-[142px] ">
                <div className="flex items-center justify-between w-[360px] h-[44px]">
                  <label className="min-w-[147px] h-[36px] text-[24px] leading-9 font-semibold text-secondary-50">
                    Event Name
                  </label>
                  <span className="span-Event">Required</span>
                </div>
                <div className="text-secondary-50 w-[360px] h-[140px]">
                  <p className="text-[14px] font-normal leading-[20px] text-justify">
                    Nama event maksimal 40 karakter. Disarankan untuk tidak
                    menggunakan huruf kapital berlebih, memasukkan lebih dari 1
                    merek, dan kata kata promosi.
                  </p>
                </div>
              </div>
              <div className="flex items-center opacity-90">
                <input
                  type="text"
                  placeholder="Type here"
                  className="input-Event"
                />
              </div>
            </div>

            <div className="flex md:flex-row items-start justify-between w-[1112px] h-[142px] gap-[149px] mt-16">
              <div className="flex flex-col gap-[18px] w-[360px] h-[142px] ">
                <div className="flex items-center justify-between w-[360px] h-[44px]">
                  <label className="min-w-[115px] h-[36px] text-[24px] leading-9 font-semibold text-secondary-50">
                    Category
                  </label>
                  <span className="span-Event">Required</span>
                </div>
                <div className="text-secondary-50 w-[360px] min-h-[160px]">
                  <p className="text-[14px] font-normal leading-[20px] text-justify">
                    Pilih kategori yang sesuai karena biaya layanan akan
                    tergantung pada kategori. Jika pemilihan kategori kurang
                    sesuai, maka kategori akan diubah oleh Admin
                  </p>
                </div>
              </div>
              <div className="flex items-start md:items-center justify-end  md:w-3/5 font-semibold">
                <select className="dropdownInput-Event ">
                  <option disabled selected>
                    Pick your an option
                  </option>
                  <option>Festival</option>
                  <option>Greedo</option>
                </select>
                <img
                  src={Button}
                  alt="button"
                  className="w-[56px] h-[52px] rounded-lg ga-[8px] mx-auto "
                />
              </div>
            </div>
          </div>

          <div className="div-detailEvent shadow-custom-1 shadow-custom-2">
            <h1 className="w-[328px] h-[48px] text-[32px] leading-[48px] font-semibold text-primary-0 mb-10">
              Detail Event
            </h1>
            <div className="flex flex-row items-start justify-between w-[1112px] h-[122px] gap-[149px]">
              <div className="flex flex-col gap-[18px] w-[360px] h-[122px] ">
                <div className="flex items-center justify-between w-[360px] h-[44px]">
                  <label className="min-w-[176px] h-[36px] text-[24px] leading-9 font-semibold text-secondary-50">
                    Location
                  </label>
                  <span className="span-Event">Required</span>
                </div>
                <div className="text-secondary-50 w-[360px] h-[60px]">
                  <p className="text-[14px] font-normal leading-[20px] text-justify">
                    Pastikan lokasi yang dimasukan akurat agar tidak ada
                    terjadinya kesalah pahaman dengan customer
                  </p>
                </div>
              </div>
              <div className="relative w-[700px] h-[107px] flex flex-wrap gap-[24px] items-start justify-start">
                <div className="flex items-center justify-center gap-[24px]">
                  <div className="w-[603px] h-[46px] flex items-center pt-[14px] pr-[16px] pb-[14px] pl-[16px] gap-[2px] border-secondary-55 bg-primary-100 rounded-lg ">
                    <input
                      type="text"
                      placeholder="Addres"
                      className="input input-md border w-[547px] h-[18px] text-base-100 bg-primary-100 rounded-md text-sm font-semibold text-[16px] leading-[24px]"
                    />
                    <img
                      src={Location}
                      alt="location"
                      className="w-[16px] h-[16px] mx-auto"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-row items-start justify-between w-[1112px] h-[102px] gap-[149px] mt-10">
              <div className="flex flex-col gap-[18px] w-[360px] h-[102px] ">
                <div className="flex items-center justify-between w-[360px] h-[44px]">
                  <label className="min-w-[176px] h-[36px] text-[24px] leading-9 font-semibold text-secondary-50">
                    Date
                  </label>
                  <span className="span-Event">Required</span>
                </div>
                <div className="text-secondary-50 w-[360px] h-[40px]">
                  <p className="text-[14px] font-normal leading-[20px] text-justify">
                    masukan tanggal event yang berisikan tahun, bulan, hari
                    dengan akurat
                  </p>
                </div>
              </div>
              <div className="w-[700px] h-[107px] flex flex-wrap gap-[24px] items-start justify-start">
                <div className="flex items-center justify-center gap-[24px]">
                  <div className="w-[603px] h-[46px] flex items-center pt-[14px] pr-[16px] pb-[14px] pl-[16px] gap-[2px] border-secondary-55 bg-primary-100 rounded-lg">
                    <input
                      type="text"
                      placeholder="Pick a date"
                      className="input input-md w-[547px] h-[18px] text-base-100 bg-primary-100 rounded-md text-sm font-semibold text-[16px] leading-[24px] "
                    />
                    <img
                      src={DateEvent}
                      alt="iconDate"
                      className="w-[16px] h-[16px] mx-auto"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex md:flex-row items-start justify-between w-[1112px] h-[202px] gap-[149px] mt-14">
              <div className="flex flex-col gap-[18px] w-[360px] h-[202px] ">
                <div className="flex items-center justify-between w-[360px] h-[44px] gap-[15px]">
                  <label className="min-w-[172px] h-[36px] text-[24px] leading-9 font-semibold text-secondary-50">
                    Photo event
                  </label>
                  <span className="span-Event">Required</span>
                </div>
                <div className="text-secondary-50 w-[360px] min-h-[140px]">
                  <p className="text-[14px] font-normal leading-[20px] text-justify">
                    Format foto harus .jpg, jpeg,png dan ukuran minimal 300 x
                    300 px. <br />
                    <br />
                    Pilih foto produk atau tarik dan letakkan hingga 7 foto
                    sekaligus di sini. Upload Minimal 5 foto yang menarik dan
                    berbeda satu sama lain untuk menarik perhatian pembeli.
                  </p>
                </div>
              </div>
              <div
                className="w-[700px] h-[107px] flex flex-wrap gap-[24px] items-start justify-start cursor-pointer"
                onClick={handleFileUploadClick}
              >
                <div className="w-[108px] h-[107px] border border-dotted  border-primary-0 flex items-center justify-center">
                  <div className="text-center min-w-[69px] h-[47px]">
                    <img
                      src={Photo}
                      alt="photo"
                      className="w-[18px] h-[18px] mx-auto"
                    />
                    <span className="w-[69px] h-[15px] mx-auto text-[12px] leading-[14.52px] text-primary-0">
                      Tambah Foto
                    </span>
                  </div>
                </div>
              </div>
              <input
                type="file"
                accept="image/png, image/jpeg"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </div>

            <div className="flex flex-row items-start justify-between w-[1112px] h-[229px] gap-[149px] mt-16">
              <div className="flex flex-col gap-[18px] w-[360px] h-[194px] ">
                <div className="flex items-center justify-between w-[360px] h-[44px]">
                  <label className="min-w-[360px] h-[36px] text-[24px] leading-9 font-semibold text-secondary-50 gap-[15px]">
                    Description
                  </label>
                </div>
                <div className="text-secondary-50 w-[360px] h-[140px]">
                  <p className="text-[14px] font-normal leading-[20px] text-justify">
                    Pastikan deskripsi produk memuat penjelasan detail terkait
                    produkmu agar pembeli mudah mengerti dan menemukan produkmu.
                    <br />
                    <br />
                    Disarankan untuk tidak memasukkan info nomor HP, e-mail, dsb
                    ke dalam deskripsi produk untuk melindungi data pribadimu.
                  </p>
                </div>
              </div>
              <div className="flex items-center w-[603px] h-[229px]">
                <textarea
                  type="text"
                  placeholder="Deskripsi"
                  className="textarea-Event"
                />
              </div>
            </div>
          </div>

          <div className="event-Price2 shadow-custom-1 shadow-custom-2">
            <div className="flex flex-col md:flex-row items-start md:items-center mb-4">
              <h1 className="min-w-[81px] h-[48px] text-[32px] leading-[48px] font-semibold text-primary-0">
                Ticket
              </h1>
            </div>
            <div className="flex flex-row items-start justify-between w-[1112px] h-[100px] gap-[149px] mt-14">
              <div className="flex flex-col gap-[18px] w-[360px] h-[122px] ">
                <div className="flex items-center justify-between w-[360px] h-[44px]">
                  <label className="min-w-[176px] h-[36px] text-[24px] leading-9 font-semibold text-secondary-50">
                    Ticket
                  </label>
                  <span className="span-Event">Required</span>
                </div>
                <div className="text-secondary-50 w-[360px] h-[60px]">
                  <p className="text-[14px] font-normal leading-[20px] text-justify">
                    Masukan keterangan ticket dengan teliti agar tidak terjadi
                    kesalahan harga
                  </p>
                </div>
              </div>
              <div className="relative w-[700px] h-[107px] flex flex-wrap gap-[24px] items-start justify-start">
                <div className="flex items-center justify-center gap-[24px]">
                  <div className="w-[603px] h-[46px] flex items-center border border-base-300 bg-primary-100 rounded-lg">
                    <input
                      type="text"
                      placeholder="Insert Ticket Detail"
                      className="input-ticketDetail"
                    />
                    <img
                      src={IconTicket}
                      alt="iconTicket"
                      className="w-[16px] h-[16px] mx-auto"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end min-w-[424px] h-[60px] top-[2348px] left-[875px] gap-[24px] pr-[135px] mt-32">
          <button className="btn-cancel">Cancel</button>
          <button className="btn-Event">Save</button>
        </div>
      </section>
    </>
  );
}
