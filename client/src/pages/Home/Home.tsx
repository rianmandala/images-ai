import { lazy, Suspense, useRef, useState } from "react";

import { stySearch } from "./styles";
import InfinitePosts from "../../components/InfinitePosts";
import { InputRef } from "antd";
import Loader from "../../components/Loader";
const Search = lazy(() => import("antd/es/input/Search"));

const Home = () => {
  const [searchPrompt, setSearchPrompt] = useState("");
  const searchRef = useRef<InputRef>(null);

  const handleSearchSubmit = (value: string) => {
    setSearchPrompt(value);
    if (!value.trim()) {
      searchRef.current?.focus();
    }
  };

  return (
    <section>
      <div>
        <div
          className="h-[50vh] w-full !bg-blend-multiply !bg-center !bg-cover !bg-[rgba(0,0,0,0.7)] flex justify-center items-center px-4"
          style={{
            background: `url(https://res.cloudinary.com/dgtcoctbo/image/upload/v1719603542/DALL-E-AI/louukx5ttdlb7rgmjbp2.webp)`,
          }}
        >
          <div>
            <h1 className="font-extrabold text-white text-[24px] sm:text-[32px]">
              Images AI
            </h1>
            <p className="mt-2 text-white text-[16px] max-w [500px]">
              Browse through a collection of imaginative and visually stunning
              images generated DALL-E AI
            </p>
            <div className="mt-9">
              <Suspense fallback={null}>
                <Search
                  ref={searchRef}
                  className={stySearch}
                  onSearch={handleSearchSubmit}
                  placeholder="shining leopard wearing a cyborg helmet"
                  enterButton
                  height={200}
                />
              </Suspense>
            </div>
          </div>
        </div>

        <div className="mt-10 max-w-7x1 max-auto md:p-5 lg:p-8 px-3 py-4">
          <Suspense fallback={<Loader />}>
            <InfinitePosts
              gridRow={searchPrompt ? 4 : 6}
              searchPrompt={searchPrompt}
              action={searchPrompt ? "search" : "posts"}
            />
          </Suspense>
        </div>
      </div>
    </section>
  );
};

export default Home;
