import { useState, useEffect, useContext } from 'react'
import { Context } from '../../context'
import InstructorRoute from '../../components/routes/InstructorRoute'
import axios from 'axios'
import {
  DollarOutlined,
  SettingOutlined,
  LoadingOutlined,
} from '@ant-design/icons'
import { currencyFormatter } from '../../utils/helpers'

const InstructorRevenue = () => {
  const [balance, setBalance] = useState({ pending: [] })

  useEffect(() => {
    sendBalanceRequest()
  }, [])

  const sendBalanceRequest = async () => {
    console.log('SEND BALANCE REQUEST')
  }

  const hanlePayoutSettings = async () => {
    console.log('Handle payout settings')
  }

  return (
    <InstructorRoute>
      <div className="container">
        <div className="row pt-2">
          <div className="col-md-8 offset-md-2 bg-light p-5">
            <h2>
              Revenue report <DollarOutlined className="float-right" />{' '}
            </h2>
            <small>
              You get paid directly from stripe to your bank account every 48
              hours
            </small>
            <hr />
            <h4>
              Pending balance <span className="float-right">$0.00</span>
            </h4>
            <small>For 48 hours</small>
            <hr />
            <h4>
              Payout{' '}
              <SettingOutlined
                className="float-right"
                onClick={hanlePayoutSettings}
              />
            </h4>
            <small>
              Update your stripe account details or view previous payouts.
            </small>
          </div>
        </div>
      </div>
    </InstructorRoute>
  )
}

export default InstructorRevenue
