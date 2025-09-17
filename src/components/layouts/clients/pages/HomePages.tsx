/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Card, Pagination, Skeleton } from "antd";
import Meta from "antd/es/card/Meta";
import { useQuery } from "@tanstack/react-query";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { getHome } from "../../../../configs/api";
import { Link } from "react-router-dom";

const HomePages = () => {
  const {
    data = [],
    error,
    isLoading,
  } = useQuery<any[]>({
    queryKey: ["home"],
    queryFn: getHome,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  if (isLoading) {
    return (
      <div className="grid grid-cols-4 gap-x-8 gap-y-8 p-6">
        {Array.from({ length: pageSize }).map((_, i) => (
          <Card key={i} className="h-full flex flex-col">
            <Skeleton.Image active className="!w-full !h-72 object-cover" />
            <Skeleton active paragraph={{ rows: 2 }} />
          </Card>
        ))}
      </div>
    );
  }

  if (error instanceof Error) return <div>Error: {error.message}</div>;

  const currentStories = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="p-4">
      <div className="text-3xl font-sans mb-4">
        <h1>Danh sách truyện</h1>
      </div>
      <div className="grid grid-cols-4 gap-x-8 gap-y-8 m-3">
        {currentStories.map((story: any) => (
          <Card
            key={story._id}
            hoverable
            className="h-full flex flex-col"
            cover={
              <img
                alt={story.name}
                src={`https://otruyenapi.com/uploads/comics/${story.thumb_url}`}
                className="h-72 object-cover"
              />
            }
          >
            <Meta
              title={<div className="line-clamp-2">{story.name}</div>}
              description={<div className="text-green-500">{story.status}</div>}
            />
            <p className="mt-3">{story.updatedAt}</p>
            <div className="mt-auto bg-slate-800 text-white hover:bg-white hover:text-slate-800 py-2 text-center rounded-2xl">
              <Link to={`/detail/${story.slug}`}>More Detail</Link>
            </div>
          </Card>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={data?.length || 0}
          onChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default HomePages;
