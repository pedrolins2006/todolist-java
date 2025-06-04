"use client";
import React from "react";
import RemoveBtn from "./RemoveBtn";

const TopicList = () => {
  return (
    <>
      <div className="">
        <ul className="">
          <li className="p-4 border border-slate-300 my-3 flex justify-between tgap-5 items-start rounded-md">
            <div>
              <h2>Topic Title</h2>
              <div>Topi description</div>
            </div>
            <div className="flex gap-2">
              <RemoveBtn />
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default TopicList;
