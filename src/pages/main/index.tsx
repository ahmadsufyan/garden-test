import PriceService from "@services/priceService";
import React, { useEffect } from "react";
import { List, Tag, Typography } from "antd";
import style from "./style.module.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PriceAction } from "@states/PriceReducer";
import { State } from "@states/store";
import { FormOutlined } from "@ant-design/icons";

const priceService = new PriceService();

interface Props {}

const Main: React.FC<Props> = () => {
  const data = useSelector((state: State) => state.price.data);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function fetchData(signal?: AbortSignal) {
    try {
      const response = await priceService.loadData(signal);
      if (response.status === 200) {
        dispatch(PriceAction.setData(response.data));
      }
    } catch (error) {}
  }

  useEffect(() => {
    const controller = new AbortController();
    if (!data.length) fetchData(controller.signal);
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div className={style["container"]}>
      <List
        itemLayout="horizontal"
        dataSource={data}
        className={style["list"]}
        renderItem={(item) => (
          <List.Item className="!py-1">
            <button
              onClick={() => {
                navigate(`/${item.id}/detail`);
              }}
              className={style["item"]}
            >
              <div className="inline-flex w-full items-center">
                <div className={style["icon"]}>
                  <FormOutlined className="text-white" />
                </div>
                <Typography.Text className="flex-1">
                  {item.type}
                </Typography.Text>
                <Tag>{item.group}</Tag>
              </div>
              <Typography.Text className="flex-1">
                {item.description}
              </Typography.Text>
            </button>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Main;
