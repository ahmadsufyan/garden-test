import { PriceAction } from "@states/PriceReducer";
import { State } from "@states/store";
import {
  Button,
  Form,
  FormInstance,
  Input,
  InputNumber,
  Typography,
} from "antd";
import clsx from "clsx";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import style from "./style.module.scss";

interface Props {}

const Detail: React.FC<Props> = () => {
  const data = useSelector((state: State) => state.price.data);
  const selectedData = useSelector((state: State) => state.price.selectedData);

  const { priceId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formRef = React.useRef<FormInstance>(null);

  useEffect(() => {
    if (!priceId) return;
    if (!formRef.current) return;
    const selectedData = data.find((d) => d.id === priceId);

    if (selectedData) {
      resetToInitialValues();
    }

    dispatch(PriceAction.setSelectedData(selectedData));
  }, [formRef.current, priceId]);

  function resetToInitialValues() {
    formRef.current?.setFieldsValue({
      type: selectedData?.type,
      description: selectedData?.description,
      group: selectedData?.group,
      rate: selectedData?.rate,
      width: selectedData?.width,
      height: selectedData?.height,
    });
  }

  function cancel() {
    formRef.current?.resetFields();
    navigate(-1);
  }

  function onSave(values: any) {
    dispatch(
      PriceAction.updateData({
        ...selectedData,
        ...values,
      })
    );
    navigate(-1);
  }

  return (
    <div className={style["container"]}>
      <Typography.Text>Edit Data</Typography.Text>
      <Form
        ref={formRef}
        name="basic"
        className={style["form"]}
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onSave}
        autoComplete="off"
      >
        <Form.Item className={style["item"]} label="Type" name="type">
          <Input />
        </Form.Item>
        <Form.Item
          className={style["item"]}
          label="Description"
          name="description"
        >
          <Input />
        </Form.Item>
        <Form.Item className={style["item"]} label="Group" name="group">
          <Input />
        </Form.Item>
        <Form.Item className={style["item"]} label="Rate" name="rate">
          <InputNumber min={1} />
        </Form.Item>

        <Typography.Text>{"Dimension ( Width x Height )"}</Typography.Text>
        <div className="inline-flex gap-2">
          <div className={"col-span-6"}>
            <Form.Item className={clsx(style["item"], "w-full")} name="width">
              <InputNumber placeholder="Width" min={1} />
            </Form.Item>
          </div>
          <div className={"col-span-6"}>
            <Form.Item className={clsx(style["item"], "w-full")} name="height">
              <InputNumber placeholder="Height" min={1} />
            </Form.Item>
          </div>
        </div>

        <div className="inline-flex gap-2 justify-end w-full mt-4">
          <Button onClick={cancel}>Cancel</Button>
          <Button onClick={resetToInitialValues}>Reset</Button>
          <Button htmlType="submit">Submit</Button>
        </div>
      </Form>
    </div>
  );
};

export default Detail;
