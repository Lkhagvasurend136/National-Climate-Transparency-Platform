import { InfoCircleOutlined } from '@ant-design/icons';
import Paragraph from 'antd/lib/typography/Paragraph';
import './kpiStyles.scss';

const InfoKpi = () => {
  return (
    <Paragraph
      className="info-kpi"
      copyable={{ text: 'YES-1/NO-0', tooltips: 'Copy Yes/No unit to clipboard' }}
    >
      <InfoCircleOutlined className="info-icon" />
      For Yes/No indicators, set the KPI Unit to 'YES-1/NO-0'.
      <br />
      This ensures that in the Achieved and Expected fields, 1 represents Yes and 0 represents No.
    </Paragraph>
  );
};

export default InfoKpi;
