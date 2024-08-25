import "./listPage.scss";
import Filter from "../../components/filter/Filter";
import Card from "../../components/card/Card";
import Map from "../../components/map/Map";
import { Await, useLoaderData } from "react-router-dom";
import { Suspense } from "react";

function ListPage() {
  const data = useLoaderData();

  return (
    <div className="listPage">
      <div className="listContainer">
        <div className="wrapper">
          <Filter />
          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error loading posts!</p>}
            >
              {(postResponse) =>
                postResponse.data.map((post) => (
                  <Card key={post.id} item={post} />
                ))
              }
            </Await>
          </Suspense>
        </div>
      </div>
      <div className="mapContainer">
        <Suspense fallback={<p>Loading...</p>}>
          <Await
            resolve={data.postResponse}
            errorElement={<p>Error loading Map!</p>}
          >
            {(postResponse) => <Map items={postResponse.data} />}
          </Await>
        </Suspense>
      </div>
    </div>
  );
}

export default ListPage;

// import "./listPage.scss";
// import Filter from "../../components/filter/Filter";
// import Card from "../../components/card/Card";
// import Map from "../../components/map/Map";
// import { Await, useLoaderData } from "react-router-dom";
// import { Suspense } from "react";
// import { listData } from "../../lib/dummydata";

// function ListPage() {
//   const loaderData = useLoaderData();
//   const data = loaderData?.postResponse?.data || listData;

//   console.log("Loader data:", loaderData);
//   console.log("Data to be used:", data);

//   return (
//     <div className="listPage">
//       <div className="listContainer">
//         <div className="wrapper">
//           <Filter />
//           {Array.isArray(data) ? (
//             data.map((item) => <Card key={item.id} item={item} />)
//           ) : (
//             <Suspense fallback={<p>Loading...</p>}>
//               <Await
//                 resolve={loaderData.postResponse}
//                 errorElement={<p>Error loading posts!</p>}
//               >
//                 {(postResponse) =>
//                   postResponse?.data && Array.isArray(postResponse.data) ? (
//                     postResponse.data.map((post) => (
//                       <Card key={post.id} item={post} />
//                     ))
//                   ) : (
//                     <p>No posts available</p>
//                   )
//                 }
//               </Await>
//             </Suspense>
//           )}
//         </div>
//       </div>
//       <div className="mapContainer">
//         <Suspense fallback={<p>Loading...</p>}>
//           <Await
//             resolve={loaderData?.postResponse}
//             errorElement={<p>Error loading map!</p>}
//           >
//             {(postResponse) =>
//               postResponse?.data && Array.isArray(postResponse.data) ? (
//                 <Map items={postResponse.data} />
//               ) : (
//                 <p>No map data available</p>
//               )
//             }
//           </Await>
//         </Suspense>
//         <Map />
//       </div>
//     </div>
//   );
// }

// export default ListPage;
