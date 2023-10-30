import React, { Fragment } from "react";
import "./Card.css";
import { TbAlertSquareFilled } from "react-icons/tb";
import { BsFillCircleFill } from "react-icons/bs";
import { MdOutlineCancel } from "react-icons/md";
import {
  PiCellSignalHigh,
  PiCellSignalLow,
  PiCellSignalMedium,
} from "react-icons/pi";

export default function Card({ ticket, groupBy }) {
  const photos = [
    // 5 random image background colors for initials
    "#ee6633",
    "#FFB399",
    "#ff9eee",
    "#FFFF99",
    "#00f1E6",
  ];

  const isUserAvailable = JSON.parse(localStorage.getItem("users")).find(
    (user) => user.id === ticket?.userId
  )?.available;

  const userName = JSON.parse(localStorage.getItem("users")).find(
    (user) => user.id === ticket?.userId
  )?.name;

  return (
    <article className="card main-shadow main-border">
      <div className="header">
        <span className="id">{ticket?.id}</span>
        {groupBy !== "user" && (
          <div
            style={{
              backgroundColor: `${photos[ticket?.userId.split("-")[1] - 1]}`,
            }}
            className="photo"
          >
            {`${userName.split(" ")[0][0]}${
              userName.split(" ").length > 1 ? userName.split(" ")[1][0] : ""
            } `}
            <div
              style={{
                // check in users array if user is available or not
                backgroundColor: `${isUserAvailable ? `#00ff00` : `white`}`,
              }}
              className="status"
            ></div>
          </div>
        )}
      </div>
      <span className="title">{ticket?.title}</span>
      <div className="extra">
        {ticket?.tag.map((tag) => {
          return (
            <Fragment key={tag}>
              <div className="detail icon main-border">
                {ticket?.priority === 0 && <MdOutlineCancel />}
                {ticket?.priority === 1 && <PiCellSignalLow />}
                {ticket?.priority === 2 && <PiCellSignalMedium />}
                {ticket?.priority === 3 && <PiCellSignalHigh />}
                {ticket?.priority === 4 && <TbAlertSquareFilled />}
              </div>
              <div className="detail tag main-border">
                <BsFillCircleFill /> {tag}
              </div>
            </Fragment>
          );
        })}
      </div>
    </article>
  );
}
