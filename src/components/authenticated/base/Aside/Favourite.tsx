import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const style = {
  height: 30,
  border: "1px solid green",
  margin: 6,
  padding: 8
};

const Favourite = () => {
  const [state, setState] = useState({
    items: Array.from({ length: 20 }),
    hasMore: true
  });

  const fetchMoreData = () => {
    if (state.items.length >= 500) {
      setState((prev) => ({ ...prev, hasMore: false }));
      return;
    }
    // Simulate an async API call by adding more items after a timeout
    setTimeout(() => {
      setState((prev) => ({
        ...prev,
        items: prev.items.concat(Array.from({ length: 20 }))
      }));
    }, 500);
  };

  return (
    <div className="animate__animated animate__fadeIn">
      <div className="max-h-[100vh] scroll ">
        <h1>demo: react-infinite-scroll-component</h1>
        <hr />

        {state.items.map((_, index) => (
          <div style={style} key={index}>
            div - #{index}
          </div>
        ))}
        <InfiniteScroll
          dataLength={state.items.length}
          next={fetchMoreData}
          hasMore={state.hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {/* Additional content */}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Favourite;
