/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";

import TableProduct from "./TableProductD";
import TableTicket from "./TableTicketD";

import IconBukteProduct from "../../assets/icons/iconBasketProduct.png";
import IconDollarProduct from "../../assets/icons/iconDollarProduct.png";
import IconBusketTiket from "../../assets/icons/iconBasketTiket.png";
import IconDollarTiket from "../../assets/icons/iconDollarEvent.png";
import BatikPiring from "../../assets/images/imgDashboard/batikpiring.png";

export default function dashboard() {
  return (
    <>
      <div className="relative ">
        <div className="w-[1140px] min-h-[1140px] top-[171px] left-[300px] gap-[24px] bg-primary-100 font-poppins">
          <div className="flex flex-wrap w-[1056px] h-[121px] gap-[27px] mx-auto">
            <div className="w-[243.75px h-[121px] rounded-[10px] p-[30px] bg-primary-100 shadow-custom-3 shadow-custom-4">
              <div className="flex flex-wrap w-[161px] h-[61px] gap-[20px]">
                <div className="relative w-[50px] h-[50px] top-[5.5px] rounded-xl bg-base-401">
                  <img
                    src={IconBukteProduct}
                    alt="Tailwind CSS Navbar component"
                    className="relative w-[24px] h-[24px] top-[15px] left-[13.5px] rounded-full"
                  />
                </div>
                <div className="w-[91px] h-[61px]">
                  <p className="w-[91px] h-[21px] text-[14px] leading-[21px] font-bold text-secondary-65">
                    Product Sold
                  </p>
                  <p className="w-[19px] h-[30px] text-[20px] leading-[30px] font-bold text-neutral-35">
                    12
                  </p>
                </div>
              </div>
            </div>
            <div className="w-[243.75px h-[121px] rounded-[10px] p-[30px] bg-primary-100 shadow-custom-3 shadow-custom-4">
              <div className="flex flex-wrap w-[191px] h-[61px] gap-[20px]">
                <div className="relative w-[50px] h-[50px] top-[5.5px] rounded-xl bg-base-401">
                  <img
                    src={IconDollarProduct}
                    alt="Tailwind CSS Navbar component"
                    className="relative w-[24px] h-[24px] top-[15px] left-[13.5px] rounded-full"
                  />
                </div>
                <div className="w-[91px] h-[61px]">
                  <p className="w-[99px] h-[21px] text-[14px] leading-[21px] font-bold text-secondary-65">
                    Product Profit
                  </p>
                  <p className="w-[121px] h-[30px] text-[20px] leading-[30px] font-bold text-neutral-35">
                    IDR 589.000
                  </p>
                </div>
              </div>
            </div>
            <div className="w-[243.75px h-[121px] rounded-[10px] p-[30px] bg-primary-100 shadow-custom-3 shadow-custom-4">
              <div className="flex flex-wrap min-w-[149px] h-[61px] gap-[20px]">
                <div className="relative w-[50px] h-[50px] top-[5.5px] rounded-xl bg-base-401">
                  <img
                    src={IconBusketTiket}
                    alt="Tailwind CSS Navbar component"
                    className="relative w-[24px] h-[24px] top-[15px] left-[13.5px] rounded-full"
                  />
                </div>
                <div className="w-[91px] h-[61px]">
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
                <div className="relative w-[50px] h-[50px] top-[5.5px] rounded-xl bg-base-401">
                  <img
                    src={IconDollarTiket}
                    alt="Tailwind CSS Navbar component"
                    className="relative w-[24px] h-[24px] top-[15px] left-[13.5px] rounded-full"
                  />
                </div>
                <div className="w-[91px] h-[61px]">
                  <p className="w-[129px] h-[21px] text-[14px] leading-[21px] font-bold text-secondary-65">
                    Event Ticket Profit
                  </p>
                  <p className="min-w-[150px] h-[30px] text-[20px] leading-[30px] font-bold text-neutral-35">
                    IDR 712.000
                  </p>
                </div>
              </div>
            </div>
            <div className="w-[1039px] h-[621px] top-[597px] left-[350px] p-[24px] mx-auto shadow-custom-3 shadow-custom-4 mt-10">
              <div role="tablist" className="tabs tabs-lifted">
                <input 
                  type="radio" 
                  name="tabs_dashboard" 
                  role="tab" 
                  className="tab" 
                  aria-label="Product" 
                  defaultChecked/>
                    
                <div 
                  role="tabpanel" 
                  className="tab-content bg-primary-100 border-base-300 rounded-box p-6">
                  <TableProduct/>
                </div>

                <input
                  type="radio"
                  name="tabs_dashboard"
                  role="tab"
                  className="tab w-1/2"
                  aria-label="Ticket"
                />
                <div
                  role="tabpanel"
                  className="tab-content bg-primary-100 border-base-300 rounded-box p-6">
                  <TableTicket />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
