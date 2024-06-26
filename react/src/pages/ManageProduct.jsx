/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import IconBukteProduct from "../assets/icons/iconBasketProduct.png";
import IconDollarProduct from "../assets/icons/iconDollarProduct.png";
import IconBusketTiket from "../assets/icons/iconBasketTiket.png";
import IconDollarTiket from "../assets/icons/iconDollarEvent.png";
import IconSearch from "../assets/icons/IconSearch.png";
import EditSquare from "../assets/icons/article/Edit.svg";
import TombolAtas from "../assets/icons/TombolAtas.png";
import TombolBawah from "../assets/icons/TombolBawah.png";
import Trash from "../assets/icons/article/Trash.svg";
import IconSucces from "../assets/icons/form/iconSucces.svg";
import { useParams, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [resData, setResData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [fileName, setFileName] = useState("");
  const [fileContent, setFileContent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      setFileContent(file);
    }
  };

  const handleUpload = async () => {
    if (fileContent) {
      const formData = new FormData();
      const renamedFile = new File([fileContent], fileName, {
        type: fileContent.type,
      });
      formData.append("file", renamedFile);

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token tidak ditemukan di localStorage");
        }

        const response = await fetch(
          import.meta.env.VITE_API_PRODUCT_IMPORT_URL,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        );

        if (response.ok) {
          console.log("File uploaded successfully.");
          setFileName("");
          setFileContent(null);
          setIsImportModalOpen(false);
          setIsSuccessModalOpen(true);
          setTimeout(() => {
            setIsSuccessModalOpen(false);
            navigate("/dashboard/manage-product");
          }, 2000);
        } else {
          console.error("Failed to upload file.");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      console.log("No file selected.");
    }
  };

  const fetchProducts = useCallback(async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token not found");

      const response = await fetch(id || import.meta.env.VITE_API_PRODUCT_URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch products");

      const data = await response.json();
      setProducts(data.data || []);
      setResData(data);
      setCurrentPage(data.pagination.current_page);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to load products. Please try again.");
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_PRODUCT_URL}/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        fetchProducts();
      } else {
        throw new Error("Failed to delete product");
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setIsSuccessModalOpen(true);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleItemsPerPageChange = (newValue) => {
    setItemsPerPage(newValue);
    setCurrentPage(1);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  useEffect(() => {
    const newTotalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    if (currentPage > newTotalPages) {
      setCurrentPage(newTotalPages);
    }
  }, [filteredProducts, itemsPerPage, currentPage]);

  function handlePagination(isNext) {
    if (isNext && resData?.link?.next) {
      fetchProducts(resData.link.next);
    } else if (!isNext && resData?.link?.prev) {
      fetchProducts(resData.link.prev);
    }
  }

  if (error) return <div>Error: {error}</div>;
  if (!products) return <div>Loading...</div>;

  return (
    <div className="min-h-screen ">
      <div className="container font-poppins w-full max-w-[1140px] min-h-screen  top-[171px] -ml-[10px] gap-4 sm:gap-2 md:gap-3 lg:gap-2 xl:gap-4 bg-primary-100">
        <div className="flex flex-wrap w-[1056px] h-auto gap-[27px] mx-auto ">
          <div className="w-[243.75px h-[121px] rounded-[10px] p-[30px] bg-primary-100 shadow-custom-3 shadow-custom-4 ">
            <div className="flex flex-wrap w-[161px] h-[61px] gap-[20px]">
              <div className=" relative w-[50px] h-[50px] top-[5.5px] rounded-xl bg-base-401">
                <img
                  src={IconBukteProduct}
                  alt="Tailwind CSS Navbar component"
                  className="relative w-[24px] h-[24px] top-[15px]  left-[13.5px] rounded-full "
                />
              </div>
              <div className="w-[91px] h-[61px] ">
                <p className="w-[91px] h-[21px]  text-[14px] leading-[21px] font-bold text-secondary-65">
                  Product Sold
                </p>
                <p className="w-[19px] h-[30px] text-[20px] leading-[30px] font-bold text-neutral-35">
                  12
                </p>
              </div>
            </div>
          </div>

          <div className="w-[243.75px h-[121px] rounded-[10px] p-[30px] bg-primary-100 shadow-custom-3 shadow-custom-4">
            <div className="flex flex-wrap  w-[191px] h-[61px] gap-[20px]">
              <div className=" relative w-[50px] h-[50px] top-[5.5px] rounded-xl bg-base-401">
                <img
                  src={IconDollarProduct}
                  alt="Tailwind CSS Navbar component"
                  className="relative w-[24px] h-[24px] top-[15px]  left-[13.5px] rounded-full "
                />
              </div>
              <div className="w-[91px] h-[61px] ">
                <p className="w-[99px] h-[21px]  text-[14px] leading-[21px] font-bold text-secondary-65">
                  Product Profit
                </p>
                <p className="w-[121px] h-[30px] text-[20px] leading-[30px] font-bold text-neutral-35">
                  IDR 589.000
                </p>
              </div>
            </div>
          </div>
          <div className="w-[243.75px h-[121px] rounded-[10px] p-[30px] bg-primary-100 shadow-custom-3 shadow-custom-4">
            <div className="flex flex-wrap  min-w-[149px] h-[61px] gap-[20px]">
              <div className=" relative w-[50px] h-[50px] top-[5.5px] rounded-xl bg-base-401">
                <img
                  src={IconBusketTiket}
                  alt="Tailwind CSS Navbar component"
                  className="relative w-[24px] h-[24px] top-[15px]  left-[13.5px] rounded-full "
                />
              </div>
              <div className="w-[91px] h-[61px] ">
                <p className="w-[78px] h-[21px] text-[14px] leading-[21px] font-bold text-secondary-65">
                  Ticket Sold
                </p>
                <p className="w-[37px] h-[30px] text-[20px] leading-[30px] font-bold text-neutral-35">
                  320
                </p>
              </div>
            </div>
          </div>
          <div className="w-[243.75px h-[121px] rounded-[10px] p-[30px] bg-primary-100 shadow-custom-3 shadow-custom-4">
            <div className="flex flex-wrap w-[199px] h-[61px] gap-[20px]">
              <div className=" relative w-[50px] h-[50px] top-[5.5px] rounded-xl bg-base-401">
                <img
                  src={IconDollarTiket}
                  alt="Tailwind CSS Navbar component"
                  className="relative w-[24px] h-[24px] top-[15px]  left-[13.5px] rounded-full "
                />
              </div>
              <div className="w-[91px] h-[61px] ">
                <p className="w-[129px] h-[21px] text-[14px] leading-[21px] font-bold text-secondary-65">
                  Event Ticket Profit
                </p>
                <p className="min-w-[150px] h-[30px] text-[20px] leading-[30px] font-bold text-neutral-35">
                  IDR 712.000
                </p>
              </div>
            </div>
          </div>
          <div className="flex max-w-[1092px] h-[46px] gap-[24px] bg-primary-100">
            <div className="flex gap-9 items-center justify-center ">
              <div className="w-[108px] h-[46px] rounded-lg bg-primary-30 pt-[14px] pr-[16px] pb-[14px] pl-[16px] gap-[space-x-2] flex items-center justify-center hover:bg-primary-40 hover:border-primary-30">
                <Link
                  to="add"
                  className="w-[76px] h-[18px] text-secondary-91 font-semibold text-[12px] leading-[18px] text-center">
                  Add Product
                </Link>
              </div>
              <button
                className="btn w-[108px] h-[46px] rounded-lg bg-primary-30 border-primary-30 pt-[14px] pr-[16px] pb-[14px] pl-[16px] gap-[space-x-2] flex items-center justify-center hover:bg-primary-40 hover:border-primary-30  text-secondary-91 font-semibold text-[12px] leading-[18px] text-center"
                onClick={() => setIsImportModalOpen(true)}>
                Import CSV
              </button>

              {/* Import CSV Modal */}
              {isImportModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
                  <div className="modal-box bg-primary-100 min-w-lg h-[284px] rounded-lg pt-[24px] pr-[24px] pb-[24px] pl-[24px]">
                    <h3 className="text-lg text-neutral-15 font-semibold text-[18px] leading-[27px] max-w-[464px] h-[27px]">
                      Import CSV
                    </h3>
                    <p className="py-4 max-w-[464px] h-[24px] font-normal text-[16px] leading-6 mb-6">
                      Select a file and click upload
                    </p>
                    <div>
                      <input
                        type="text"
                        value={fileName}
                        onChange={(e) => setFileName(e.target.value)}
                        placeholder="Rename file..."
                        className="input input-bordered w-full bg-primary-100 text-black"
                        readOnly={!fileContent}
                      />
                    </div>
                    <div className="modal-action justify-start">
                      <input
                        type="file"
                        accept=".csv"
                        onChange={handleFileChange}
                        className="hidden"
                        id="fileInput"
                      />
                      <label
                        htmlFor="fileInput"
                        className="text-[#3F3F3F] bg-[#DBDBDD] hover:bg-base-140 w-[76px] h-[32px] text-center rounded-[4px] gap-2.5 items-center cursor-pointer">
                        <p className="text-center mt-2.5">Browse...</p>
                      </label>
                    </div>
                    <div className="modal-action">
                      <button
                        className="btn bg-base-50 border-base-50 hover:bg-[#DBDBDD] hover:border-base-50 rounded-lg text-primary-0 font-semibold text-center w-[76px] h-[46px]"
                        onClick={() => setIsImportModalOpen(false)}>
                        Cancel
                      </button>
                      <button
                        className="btn text-primary-100 font-semibold bg-primary-30 border-primary-30 hover:bg-primary-40 hover:border-primary-40 w-[76px] h-[46px]"
                        onClick={handleUpload}>
                        Upload
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="flex w-[768px] h-[46px] rounded-lg border pt-[14px] pr-[16px] pb-[14px] pl-[16px] gap-[space-x-2]">
              <img
                src={IconSearch}
                alt="Search"
                className="w-[20px] h-[20px]"
                style={{ cursor: "pointer" }}
              />
              <input
                id="search"
                type="text"
                className="grow bg-transparent outline-none"
                placeholder="Type here to search products"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
          </div>
          {/* Product table */}
          <div className="w-[1037px] h-auto p-6 mx-auto shadow-custom-3 shadow-custom-4 relative">
            <div className="overflow-x-auto">
              <table className="table">
                <thead className="mx-auto text-center text-neutral-15 border-none">
                  <tr className="border-none max-w-[989px] h-[56px] pt-[16px] pr-[0px] pb-[16px] pl-[0px] gap-[56px]">
                    <th>Product</th>
                    <th>Stock</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Rating</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className="mx-auto text-center border-t-2">
                  {currentProducts.map((product) => (
                    <tr
                      key={product.id}
                      className="border-none max-w-[1044px] h-[64px] pt-[16px] pr-[0px] pb-[16px] pl-[0px] gap-[12px] text-neutral-15 ">
                      <td className="flex items-center gap-10 mx-auto mt-6">
                        {product.product_images &&
                          product.product_images.length > 0 && (
                            <img
                              src={product.product_images[0].image_url}
                              alt={product.name}
                              className="w-16 h-16 object-cover rounded-md"
                            />
                          )}
                        {product.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-neutral-15">
                        {product.product_variants
                          ? product.product_variants.reduce(
                              (total, variant) => total + variant.stock,
                              0
                            )
                          : "N/A"}
                      </td>
                      <td className="px-6 py-4 text-sm text-neutral-15 ">
                        {product.category_name}
                      </td>
                      <td className="px-6 py-4 text-sm text-neutral-15 ">
                        {product.price}
                      </td>
                      <td className="px-6 py-4 text-sm text-neutral-15 ">
                        {product.rating}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap ">
                        <div className="flex items-center">
                          <Link
                            to={`/dashboard/manage-product/edit/${product.id}`}>
                            <button className="btn bg-primary-100 border-primary-100 hover:bg-primary-30 hover:border-primary-30 shadow-none">
                              <img src={EditSquare} alt="Edit" />
                            </button>
                          </Link>
                          <button
                            className="btn bg-primary-100 border-primary-100 hover:bg-primary-30 hover:border-primary-30 shadow-none"
                            onClick={() => {
                              setIsModalOpen(true);
                              setSelectedProduct(product);
                            }}>
                            <img src={Trash} alt="Delete" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-[1092px] h-[48px] gap-[24px] justify-end items-center mt-10 -ml-14">
        <div className="flex w-[196px] h-[31px] gap-[10px]">
          <p className="w-[42px] h-[24px] bg-primary-100 text-center flex items-center justify-center mt-1 text-[16px] leading-6 font-semibold text-primary-0">
            Show
          </p>
          <div className="flex w-[79px] h-[31px] rounded-[10px] border-2 pt-[2px] pr-[10px] pb-[2px] pl-[10px] gap-[28px] border-primary-0 items-center mt-0.5">
            <p className="flex w-[11px] h-[24px] bg-primary-100 text-center items-center justify-center text-[16px] leading-6 font-semibold text-primary-0">
              {itemsPerPage}
            </p>
            <div className="flex flex-col w-[9px] h-[17px] items-center justify-center gap-0.5">
              <img
                src={TombolAtas}
                className="w-20 h-20 mb-0.5 cursor-pointer"
                alt="Tombol Atas"
                onClick={() => handleItemsPerPageChange(itemsPerPage + 1)}
              />
              <img
                src={TombolBawah}
                alt="Tombol Bawah"
                className="w-20 h-20 cursor-pointer"
                onClick={() =>
                  handleItemsPerPageChange(Math.max(1, itemsPerPage - 1))
                }
              />
            </div>
          </div>
          <div className="w-[55px] h-[24px]">
            <p className="w-[42px] h-[24px] bg-primary-100 text-center flex items-center justify-center mt-1 text-[16px] leading-6 font-semibold text-primary-0">
              entries
            </p>
          </div>
        </div>

        <div className="join w-[159px] h-[48px] ">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className="join-item w-[41px] h-[48px] pt-[14px] pr-[16px] pb-[14px] pl-[16px] gap-[space-x-2] bg-base-50 hover:bg-base-70 hover:bg-[#2B3440] hover:text-primary-100 hover:text-2xl hover:font-semibold text-2xl font-semibold border-base-50 mx-auto text-primary-0 cursor-pointer"
            disabled={currentPage === 1}>
            «
          </button>
          <button className="join-item min-w-[95px] h-[48px] pt-[14px] pr-[16px] pb-[14px] pl-[16px] gap-[space-x-2] bg-base-50  border-base-50 text-2xl leading-5 font-semibold text-base-100">
            Page {currentPage}
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="join-item w-[41px] h-[48px] pt-[14px] pr-[16px] pb-[14px] pl-[16px] gap-[space-x-2] bg-base-50 hover:bg-base-70 hover:bg-[#2B3440] hover:text-primary-100 hover:text-2xl hover:font-semibold text-xl font-semibold border-base-50 mx-auto text-primary-0"
            disabled={currentPage === totalPages}>
            »
          </button>
        </div>
      </div>

      {/* Modal untuk delete product */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50  bg-primary-100 bg-opacity-0 shadow-custom-3 shadow-custom-2 ">
          <div className="p-4 modal-box bg-primary-100 min-w-[500px] h-[225px] rounded-xl pt-[24px] pr-[24px] pb-[24px] pl-[24px]">
            <h3 className="p-2 text-lg text-neutral-15 font-semibold text-[30px] leading-[27px] max-w-[464px] h-[27px]">
              Delete
            </h3>
            <p className="mt-4 py-4 p-2 max-w-[404px] h-[24px] font-normal text-neutral-15 text-[16px] leading-6 mb-6">
              This will delete post permanently. You cannot undo this action
            </p>
            <div className="modal-action justify-end mt-20">
              <button
                className="btn bg-base-400 text-neutral-15 font-semibold border-none hover:bg-[#E5E7EB] rounded-lg text-center w-[76px] h-[46px] mr-2"
                onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
              <button
                className="btn bg-primary-30 text-primary-100 font-semibold border-none hover:bg-primary-40 rounded-lg text-center w-[76px] h-[46px]"
                onClick={() => {
                  handleDelete(selectedProduct.id);
                  setIsModalOpen(false);
                }}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Ini Untuk Modal Success */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 flex  items-center justify-center z-50 bg-gray-800 bg-opacity-0 ">
          <div className="bg-primary-100 p-10 rounded-lg shadow-lg min-w-[500px] min-h-[250px]">
            <div className="flex flex-col items-center">
              <div className="mb-2">
                <img
                  src={IconSucces}
                  alt="Success"
                  className="w-[70px] h-[70px]"
                />
              </div>
              <h3 className="mt-4 text-[18px] leading-[27px] text-center font-semibold text-neutral-15">
                Success
              </h3>
              <p className="mt-4 text-[18px] leading-[27px] text-center font-normal text-neutral-15">
                Success processing your request
              </p>
              <button
                className="mt-20 w-[464px] h-[46px] bg-primary-30 hover:bg-primary-40 text-primary-100 rounded-lg"
                onClick={() => setIsSuccessModalOpen(false)}>
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
