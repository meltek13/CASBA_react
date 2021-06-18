import React from "react";

const News = () => {
  let dateFormatMonth = new Intl.DateTimeFormat("fr-FR", { month: "short" });
  let dateFormatDay = new Intl.DateTimeFormat("fr-FR", { day: "numeric" });

  let newDate = new Date();
  return (
    <div>
      <h1>actu</h1>
      <div className="tool">
        <div className="card-body ">
          <div className="card-header header-one">
            {dateFormatMonth.format(newDate)}
          </div>
          <div className="card-content">{dateFormatDay.format(newDate)}</div>
        </div>
      </div>
    </div>
  );
};

export default News;
