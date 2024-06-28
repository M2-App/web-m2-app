import { Form, GetRef, Input, Select } from "antd";
import Strings from "../../../utils/localizations/Strings";
import { BsCardText } from "react-icons/bs";
import { LuTextCursor } from "react-icons/lu";
import { useAppSelector } from "../../../core/store";
import { useEffect, useState } from "react";
import { selectCurrentRowData, selectSiteId } from "../../../core/genericReducer";
import { useGetSiteResponsiblesMutation } from "../../../services/userService";
import { Responsible } from "../../../data/user/user";
import { Level } from "../../../data/level/level";

type FormInstance = GetRef<typeof Form>;

interface FormProps {
  form: FormInstance;
}

const UpdateLevelForm = ({ form }: FormProps) => {
  const [getResponsibles] = useGetSiteResponsiblesMutation();
  const siteId = useAppSelector(selectSiteId);
  const [data, setData] = useState<Responsible[]>([]);
  const rowData = useAppSelector(selectCurrentRowData) as unknown as Level;

  const handleGetResponsibles = async () => {
    const responsibles = await getResponsibles(siteId).unwrap();
    setData(responsibles);
  };
  useEffect(() => {
    handleGetResponsibles();
    form.setFieldsValue({ ...rowData });
  }, []);

  const selectOptions = () => {
    return data.map((responsible) => (
      <Select.Option key={responsible.id} value={responsible.id}>
        {responsible.name}
      </Select.Option>
    ));
  };
  return (
    <Form form={form}>
      <div className="flex flex-col">
        <div className="flex flex-row flex-wrap">
          <Form.Item name="id" className="hidden">
            <Input />
          </Form.Item>
          <Form.Item
            name="name"
            validateFirst
            rules={[{ required: true, message: Strings.name }, { max: 45 }]}
            className="mr-1"
          >
            <Input
              size="large"
              maxLength={45}
              addonBefore={<LuTextCursor />}
              placeholder={Strings.name}
            />
          </Form.Item>
          <Form.Item
            name="description"
            validateFirst
            rules={[
              { required: true, message: Strings.requiredDescription },
              { max: 100 },
            ]}
            className="flex-1"
          >
            <Input
              size="large"
              maxLength={100}
              addonBefore={<BsCardText />}
              placeholder={Strings.description}
            />
          </Form.Item>
        </div>
        <Form.Item
          name="responsibleId"
          validateFirst
          rules={[{ required: true, message: Strings.requiredResponsableId }]}
          className="flex-1"
        >
          <Select size="large" placeholder={Strings.responsible}>
            {selectOptions()}
          </Select>
        </Form.Item>
        <Form.Item name="status" className="hidden">
          <Input />
        </Form.Item>
      </div>
    </Form>
  );
};

export default UpdateLevelForm;
