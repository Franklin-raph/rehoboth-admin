import React, { useState, useEffect } from 'react'
import SideNav from '../../components/side-nav/Sidenav'
import TopNav from '../../components/top-nav/TopNav'
import { BiChevronDown, BiDotsHorizontal, BiDotsVertical, BiFilter, BiSearch } from 'react-icons/bi';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { PiArrowElbowUpLeftLight } from 'react-icons/pi';
import { MdCancel } from 'react-icons/md';

const Dashboard = () => {

  const userData = JSON.parse(localStorage.getItem('userData')) || null;

  useEffect(() => {
    console.log(userData?.data?.token);
    
    getLeaderBoard()
  },[])

  // const data = [
  //   { name: 'Cash Transactions', value: 20, color: '#FFBB28' },
  //   { name: 'Deposit', value: 20, color: '#FF8042' },
  //   { name: 'Withdrawal', value: 20, color: '#00C49F' },
  //   { name: 'Saved', value: 20, color: '#0088FE' },
  // ];

  const [loadingTx, setLoadingTx] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [leaderboardData, setLeaderboardData] = useState([])
  const API_KEY = import.meta.env.VITE_API_KEY
  const BASE_URL = import.meta.env.VITE_BASE_URL

  async function getLeaderBoard() {
    const res = await fetch(`${BASE_URL}/user/account/referrals/leaderboard`,{
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${userData?.data?.token}`,
            'Api-Key': `${API_KEY}`,
        }
    })
    const data = await res.json()
    setLeaderboardData(data.data.leaderboard)
    console.log(res, data);
}

  console.log(userData);

  const transactionHistory = [

    {
  
      _links: {
  
        self: {
  
          href: 'https://horizon.stellar.org/operations/225399802089779201'
  
        },
  
        transaction: {
  
          href: 
  
            'https://horizon.stellar.org/transactions/1e9a4dbfff2a20c14bed37d34dd898fe09a87aac1e6f59d95bda5b0f627ec57a'
  
        },
  
        effects: {
  
          href: 'https://horizon.stellar.org/operations/225399802089779201/effects'
  
        },
  
        succeeds: {
  
          href: 
  
            'https://horizon.stellar.org/effects?order=desc&cursor=225399802089779201'
  
        },
  
        precedes: {
  
          href: 
  
            'https://horizon.stellar.org/effects?order=asc&cursor=225399802089779201'
  
        }
  
      },
  
      id: '225399802089779201',
  
      paging_token: '225399802089779201',
  
      transaction_successful: true,
  
      source_account: 'GDUVT6QWFTZXIDHFCRCICPLJC3KBZUMITARZH52JFGKE34RUEH5CS4SE',
  
      type: 'create_account',
  
      type_i: 0,
  
      created_at: '2024-07-08T14:52:34Z',
  
      transaction_hash: 
  
        '1e9a4dbfff2a20c14bed37d34dd898fe09a87aac1e6f59d95bda5b0f627ec57a',
  
      starting_balance: '1.0000000',
  
      funder: 'GDUVT6QWFTZXIDHFCRCICPLJC3KBZUMITARZH52JFGKE34RUEH5CS4SE',
  
      account: 'GC3EBC2GYYR2XSV52SHMNMLVKICIQCXJXLPX66G7IBJZYUAAU4DO6CS4'
  
    },
  
    {
  
      _links: {
  
        self: {
  
          href: 'https://horizon.stellar.org/operations/225400021134536705'
  
        },
  
        transaction: {
  
          href: 
  
            'https://horizon.stellar.org/transactions/a3f7ac7672c820613ea00c5531cd786def8b98cecfd9b56c5a8844230c1b4a18'
  
        },
  
        effects: {
  
          href: 'https://horizon.stellar.org/operations/225400021134536705/effects'
  
        },
  
        succeeds: {
  
          href: 
  
            'https://horizon.stellar.org/effects?order=desc&cursor=225400021134536705'
  
        },
  
        precedes: {
  
          href: 
  
            'https://horizon.stellar.org/effects?order=asc&cursor=225400021134536705'
  
        }
  
      },
  
      id: '225400021134536705',
  
      paging_token: '225400021134536705',
  
      transaction_successful: true,
  
      source_account: 'GDUVT6QWFTZXIDHFCRCICPLJC3KBZUMITARZH52JFGKE34RUEH5CS4SE',
  
      type: 'payment',
  
      type_i: 1,
  
      created_at: '2024-07-08T14:57:33Z',
  
      transaction_hash: 
  
        'a3f7ac7672c820613ea00c5531cd786def8b98cecfd9b56c5a8844230c1b4a18',
  
      asset_type: 'native',
  
      from: 'GDUVT6QWFTZXIDHFCRCICPLJC3KBZUMITARZH52JFGKE34RUEH5CS4SE',
  
      to: 'GC3EBC2GYYR2XSV52SHMNMLVKICIQCXJXLPX66G7IBJZYUAAU4DO6CS4',
  
      amount: '10.0000000'
  
    },
  
    {
  
      _links: {
  
        self: {
  
          href: 'https://horizon.stellar.org/operations/225400059788206081'
  
        },
  
        transaction: {
  
          href: 
  
            'https://horizon.stellar.org/transactions/c50f2970348764b69f906545ac18b66c065a163987ae3dc129a71d0cec8f34fe'
  
        },
  
        effects: {
  
          href: 'https://horizon.stellar.org/operations/225400059788206081/effects'
  
        },
  
        succeeds: {
  
          href: 
  
            'https://horizon.stellar.org/effects?order=desc&cursor=225400059788206081'
  
        },
  
        precedes: {
  
          href: 
  
            'https://horizon.stellar.org/effects?order=asc&cursor=225400059788206081'
  
        }
  
      },
  
      id: '225400059788206081',
  
      paging_token: '225400059788206081',
  
      transaction_successful: true,
  
      source_account: 'GC3EBC2GYYR2XSV52SHMNMLVKICIQCXJXLPX66G7IBJZYUAAU4DO6CS4',
  
      type: 'change_trust',
  
      type_i: 6,
  
      created_at: '2024-07-08T14:58:24Z',
  
      transaction_hash: 
  
        'c50f2970348764b69f906545ac18b66c065a163987ae3dc129a71d0cec8f34fe',
  
      asset_type: 'credit_alphanum4',
  
      asset_code: 'BTC',
  
      asset_issuer: 'GBVOL67TMUQBGL4TZYNMY3ZQ5WGQYFPFD5VJRWXR72VA33VFNL225PL5',
  
      limit: '922337203685.4775807',
  
      trustee: 'GBVOL67TMUQBGL4TZYNMY3ZQ5WGQYFPFD5VJRWXR72VA33VFNL225PL5',
  
      trustor: 'GC3EBC2GYYR2XSV52SHMNMLVKICIQCXJXLPX66G7IBJZYUAAU4DO6CS4'
  
    },
  
    {
  
      _links: {
  
        self: {
  
          href: 'https://horizon.stellar.org/operations/225400094147760129'
  
        },
  
        transaction: {
  
          href: 
  
            'https://horizon.stellar.org/transactions/26a8188dfbfd34bd3725ec8432ae433f52f084252c0fcbcbf3ac24dc0679b988'
  
        },
  
        effects: {
  
          href: 'https://horizon.stellar.org/operations/225400094147760129/effects'
  
        },
  
        succeeds: {
  
          href: 
  
            'https://horizon.stellar.org/effects?order=desc&cursor=225400094147760129'
  
        },
  
        precedes: {
  
          href: 
  
            'https://horizon.stellar.org/effects?order=asc&cursor=225400094147760129'
  
        }
  
      },
  
      id: '225400094147760129',
  
      paging_token: '225400094147760129',
  
      transaction_successful: true,
  
      source_account: 'GC3EBC2GYYR2XSV52SHMNMLVKICIQCXJXLPX66G7IBJZYUAAU4DO6CS4',
  
      type: 'change_trust',
  
      type_i: 6,
  
      created_at: '2024-07-08T14:59:10Z',
  
      transaction_hash: 
  
        '26a8188dfbfd34bd3725ec8432ae433f52f084252c0fcbcbf3ac24dc0679b988',
  
      asset_type: 'credit_alphanum4',
  
      asset_code: 'ETH',
  
      asset_issuer: 'GBFXOHVAS43OIWNIO7XLRJAHT3BICFEIKOJLZVXNT572MISM4CMGSOCC',
  
      limit: '922337203685.4775807',
  
      trustee: 'GBFXOHVAS43OIWNIO7XLRJAHT3BICFEIKOJLZVXNT572MISM4CMGSOCC',
  
      trustor: 'GC3EBC2GYYR2XSV52SHMNMLVKICIQCXJXLPX66G7IBJZYUAAU4DO6CS4'
  
    },
  
    {
  
      _links: {
  
        self: {
  
          href: 'https://horizon.stellar.org/operations/225400111328337921'
  
        },
  
        transaction: {
  
          href: 
  
            'https://horizon.stellar.org/transactions/45c88408e14f94a9da3cad00adbd01d6fa2f14431f511b2e41903c7944481ace'
  
        },
  
        effects: {
  
          href: 'https://horizon.stellar.org/operations/225400111328337921/effects'
  
        },
  
        succeeds: {
  
          href: 
  
            'https://horizon.stellar.org/effects?order=desc&cursor=225400111328337921'
  
        },
  
        precedes: {
  
          href: 
  
            'https://horizon.stellar.org/effects?order=asc&cursor=225400111328337921'
  
        }
  
      },
  
      id: '225400111328337921',
  
      paging_token: '225400111328337921',
  
      transaction_successful: true,
  
      source_account: 'GC3EBC2GYYR2XSV52SHMNMLVKICIQCXJXLPX66G7IBJZYUAAU4DO6CS4',
  
      type: 'change_trust',
  
      type_i: 6,
  
      created_at: '2024-07-08T14:59:32Z',
  
      transaction_hash: 
  
        '45c88408e14f94a9da3cad00adbd01d6fa2f14431f511b2e41903c7944481ace',
  
      asset_type: 'credit_alphanum4',
  
      asset_code: 'yBTC',
  
      asset_issuer: 'GBUVRNH4RW4VLHP4C5MOF46RRIRZLAVHYGX45MVSTKA2F6TMR7E7L6NW',
  
      limit: '922337203685.4775807',
  
      trustee: 'GBUVRNH4RW4VLHP4C5MOF46RRIRZLAVHYGX45MVSTKA2F6TMR7E7L6NW',
  
      trustor: 'GC3EBC2GYYR2XSV52SHMNMLVKICIQCXJXLPX66G7IBJZYUAAU4DO6CS4'
  
    },
  
    {
  
      _links: {
  
        self: {
  
          href: 'https://horizon.stellar.org/operations/225400119917469697'
  
        },
  
        transaction: {
  
          href: 
  
            'https://horizon.stellar.org/transactions/107d95f2720ffba5f94d448330964ea84056fa38f38ec98285b5b076f718c71d'
  
        },
  
        effects: {
  
          href: 'https://horizon.stellar.org/operations/225400119917469697/effects'
  
        },
  
        succeeds: {
  
          href: 
  
            'https://horizon.stellar.org/effects?order=desc&cursor=225400119917469697'
  
        },
  
        precedes: {
  
          href: 
  
            'https://horizon.stellar.org/effects?order=asc&cursor=225400119917469697'
  
        }
  
      },
  
      id: '225400119917469697',
  
      paging_token: '225400119917469697',
  
      transaction_successful: true,
  
      source_account: 'GC3EBC2GYYR2XSV52SHMNMLVKICIQCXJXLPX66G7IBJZYUAAU4DO6CS4',
  
      type: 'change_trust',
  
      type_i: 6,
  
      created_at: '2024-07-08T14:59:43Z',
  
      transaction_hash: 
  
        '107d95f2720ffba5f94d448330964ea84056fa38f38ec98285b5b076f718c71d',
  
      asset_type: 'credit_alphanum4',
  
      asset_code: 'yBTC',
  
      asset_issuer: 'GBUVRNH4RW4VLHP4C5MOF46RRIRZLAVHYGX45MVSTKA2F6TMR7E7L6NW',
  
      limit: '0.0000000',
  
      trustee: 'GBUVRNH4RW4VLHP4C5MOF46RRIRZLAVHYGX45MVSTKA2F6TMR7E7L6NW',
  
      trustor: 'GC3EBC2GYYR2XSV52SHMNMLVKICIQCXJXLPX66G7IBJZYUAAU4DO6CS4'
  
    },
  
    {
  
      _links: {
  
        self: {
  
          href: 'https://horizon.stellar.org/operations/225400356140941313'
  
        },
  
        transaction: {
  
          href: 
  
            'https://horizon.stellar.org/transactions/4f77adc86de3142973e0c1573c2eb1c7c93fef8b7a87ed68f2cb901562ca0020'
  
        },
  
        effects: {
  
          href: 'https://horizon.stellar.org/operations/225400356140941313/effects'
  
        },
  
        succeeds: {
  
          href: 
  
            'https://horizon.stellar.org/effects?order=desc&cursor=225400356140941313'
  
        },
  
        precedes: {
  
          href: 
  
            'https://horizon.stellar.org/effects?order=asc&cursor=225400356140941313'
  
        }
  
      },
  
      id: '225400356140941313',
  
      paging_token: '225400356140941313',
  
      transaction_successful: true,
  
      source_account: 'GC3EBC2GYYR2XSV52SHMNMLVKICIQCXJXLPX66G7IBJZYUAAU4DO6CS4',
  
      type: 'payment',
  
      type_i: 1,
  
      created_at: '2024-07-08T15:05:15Z',
  
      transaction_hash: 
  
        '4f77adc86de3142973e0c1573c2eb1c7c93fef8b7a87ed68f2cb901562ca0020',
  
      asset_type: 'native',
  
      from: 'GC3EBC2GYYR2XSV52SHMNMLVKICIQCXJXLPX66G7IBJZYUAAU4DO6CS4',
  
      to: 'GDUVT6QWFTZXIDHFCRCICPLJC3KBZUMITARZH52JFGKE34RUEH5CS4SE',
  
      amount: '1.0000000'
  
    },
  
    {
  
      _links: {
  
        self: {
  
          href: 'https://horizon.stellar.org/operations/225400390500319233'
  
        },
  
        transaction: {
  
          href: 
  
            'https://horizon.stellar.org/transactions/35c89d8791aac9107aa1a8560802a4c3648161488b3d15a606086327ed3264b8'
  
        },
  
        effects: {
  
          href: 'https://horizon.stellar.org/operations/225400390500319233/effects'
  
        },
  
        succeeds: {
  
          href: 
  
            'https://horizon.stellar.org/effects?order=desc&cursor=225400390500319233'
  
        },
  
        precedes: {
  
          href: 
  
            'https://horizon.stellar.org/effects?order=asc&cursor=225400390500319233'
  
        }
  
      },
  
      id: '225400390500319233',
  
      paging_token: '225400390500319233',
  
      transaction_successful: true,
  
      source_account: 'GC3EBC2GYYR2XSV52SHMNMLVKICIQCXJXLPX66G7IBJZYUAAU4DO6CS4',
  
      type: 'payment',
  
      type_i: 1,
  
      created_at: '2024-07-08T15:06:03Z',
  
      transaction_hash: 
  
        '35c89d8791aac9107aa1a8560802a4c3648161488b3d15a606086327ed3264b8',
  
      asset_type: 'native',
  
      from: 'GC3EBC2GYYR2XSV52SHMNMLVKICIQCXJXLPX66G7IBJZYUAAU4DO6CS4',
  
      to: 'GDUVT6QWFTZXIDHFCRCICPLJC3KBZUMITARZH52JFGKE34RUEH5CS4SE',
  
      amount: '1.0000000'
  
    },
  
    {
  
      _links: {
  
        self: {
  
          href: 'https://horizon.stellar.org/operations/225400493579636737'
  
        },
  
        transaction: {
  
          href: 
  
            'https://horizon.stellar.org/transactions/2cc7702c2bd94330ac43d69dc63324b745f4f749742762da2c70c13a3f46eafe'
  
        },
  
        effects: {
  
          href: 'https://horizon.stellar.org/operations/225400493579636737/effects'
  
        },
  
        succeeds: {
  
          href: 
  
            'https://horizon.stellar.org/effects?order=desc&cursor=225400493579636737'
  
        },
  
        precedes: {
  
          href: 
  
            'https://horizon.stellar.org/effects?order=asc&cursor=225400493579636737'
  
        }
  
      },
  
      id: '225400493579636737',
  
      paging_token: '225400493579636737',
  
      transaction_successful: true,
  
      source_account: 'GC3EBC2GYYR2XSV52SHMNMLVKICIQCXJXLPX66G7IBJZYUAAU4DO6CS4',
  
      type: 'payment',
  
      type_i: 1,
  
      created_at: '2024-07-08T15:08:21Z',
  
      transaction_hash: 
  
        '2cc7702c2bd94330ac43d69dc63324b745f4f749742762da2c70c13a3f46eafe',
  
      asset_type: 'native',
  
      from: 'GC3EBC2GYYR2XSV52SHMNMLVKICIQCXJXLPX66G7IBJZYUAAU4DO6CS4',
  
      to: 'GDUVT6QWFTZXIDHFCRCICPLJC3KBZUMITARZH52JFGKE34RUEH5CS4SE',
  
      amount: '3.0000000'
  
    },
  
    {
  
      _links: {
  
        self: {
  
          href: 'https://horizon.stellar.org/operations/225400540824121345'
  
        },
  
        transaction: {
  
          href: 
  
            'https://horizon.stellar.org/transactions/d95048d471f46f62f64efa682626dbc953a350c9547722b4922662a12d5a66b3'
  
        },
  
        effects: {
  
          href: 'https://horizon.stellar.org/operations/225400540824121345/effects'
  
        },
  
        succeeds: {
  
          href: 
  
            'https://horizon.stellar.org/effects?order=desc&cursor=225400540824121345'
  
        },
  
        precedes: {
  
          href: 
  
            'https://horizon.stellar.org/effects?order=asc&cursor=225400540824121345'
  
        }
  
      },
  
      id: '225400540824121345',
  
      paging_token: '225400540824121345',
  
      transaction_successful: true,
  
      source_account: 'GC3EBC2GYYR2XSV52SHMNMLVKICIQCXJXLPX66G7IBJZYUAAU4DO6CS4',
  
      type: 'payment',
  
      type_i: 1,
  
      created_at: '2024-07-08T15:09:23Z',
  
      transaction_hash: 
  
        'd95048d471f46f62f64efa682626dbc953a350c9547722b4922662a12d5a66b3',
  
      asset_type: 'native',
  
      from: 'GC3EBC2GYYR2XSV52SHMNMLVKICIQCXJXLPX66G7IBJZYUAAU4DO6CS4',
  
      to: 'GDUVT6QWFTZXIDHFCRCICPLJC3KBZUMITARZH52JFGKE34RUEH5CS4SE',
  
      amount: '3.0000000'
  
    }
  
  ]

  return (
    <div>
        <div className='flex items-start bg-[#F5F5F5]'>
            <SideNav />
            <div className="w-full lg:w-[84%] bg-[#F5F5F5] ml-auto">
                <TopNav />
                <div className="p-[20px] mt-5 lg:mx-[25px] mx-[10px] bg-[#FFFFFF] border border-[#BDBDBD]">
                  <p className='text-[#121212] md:text-[24px] text-[18px]'>Hi, {userData?.data?.username}</p>
                  <p className='text-[#767676] text-[14px] font-[300]'>Welcome to Rehoboth finance </p>
                  <div className='grid grid-cols-1 gap-4 mt-10 justify-between items-center'>
                    <div className='border p-3 border-[#E1E1E1] rounded-[8px]'>
                      <div className='flex items-center justify-between mb-4'>
                        <p>Total Users</p>
                        <BiDotsVertical className='cursor-pointer' />
                      </div>
                      <p className='text-[32px]'>0</p>
                    </div>
                    {/* <div className='border p-3 border-[#E1E1E1] rounded-[8px]'>
                      <div className='flex items-center justify-between mb-4'>
                        <p>Transactions</p>
                        <BiDotsVertical className='cursor-pointer' />
                      </div>
                      <p className='text-[32px] flex items-end'>0 <span className='text-[14px] mb-[0.5rem]'>NGN</span> </p>
                    </div> */}
                  </div>

                  

                  <div className='mt-[3rem]'>
                    <p className='text-[#121212] sm:text-[20px] mb-3'>All Users</p>
                    <div className='border p-[3px] rounded-[7px]'>
                      <div className='flex items-center justify-between mb-10'>
                        {/* <div className='flex items-center gap-2'>
                          <div className='flex items-center gap-1 p-1 rounded-full'>
                            <BiFilter />
                            <p>Filter</p>
                            <BiChevronDown />
                          </div>
                          <div className='flex items-center gap-1 p-1 rounded-full'>
                            <BiFilter />
                            <p>Sort</p>
                            <BiChevronDown />
                          </div>
                          <div className='flex items-center gap-1 p-1 rounded-full text-primary-color'>
                            <BiFilter />
                            <p>Yesterday</p>
                            <MdCancel />
                          </div>
                        </div> */}
                        <div className='flex items-center gap-2 border rounded-full py-[6px] px-3 m-3 w-[30%]'>
                            <BiSearch />
                            <input onChange={e => setSearchText(e.target.value)} type="text" className='w-full py-1 bg-transparent outline-none text-[12px] text-[#0E0F0C]' placeholder='Filter Users'/>
                        </div>
                      </div>
                      <div className="relative overflow-x-auto">                    
                        <table className="w-full text-sm text-left rtl:text-left">
                            <thead className="text-[12px] text-[#121212]">
                                <tr>
                                    <th scope="col" className="px-6 py-3 th1 font-[400]">S/N</th>
                                    <th scope="col" className="px-6 py-3 font-[400]">Username</th>
                                    <th scope="col" className="px-6 py-3 font-[400]">Email</th>
                                    <th scope="col" className="px-6 py-3 font-[400]">Wallet Address</th>
                                    <th scope="col" className="px-6 py-3 font-[400]">Is Email Verified</th>
                                    <th scope="col" className="px-6 py-3 font-[400]">Is Suspended</th>
                                    {/* <th scope="col" className="px-6 py-3 font-[400]">Date</th> */}
                                </tr>
                            </thead>
                            {
                                loadingTx && 
                                <tr>
                                    <td colSpan="7" className='py-20 text-center'>
                                        <img src="./images/loader.gif" className='w-[50px] mx-auto' alt="Loading..." />
                                    </td>
                                </tr>
                            }
                            <tbody>
                                {
                                    transactionHistory.filter(transaction => transaction?.transaction_hash?.includes(searchText?.toLowerCase()))
                                    .map((transaction, index) => {
                                        return (
                                            <tr style={{borderBottom:"1px solid #dcdcdc"}} className='text-[12px] cursor-pointer' onClick={() => transactionInfo(transaction)}>
                                                <td className="px-6 py-4">{index + 1}.</td>
                                                <td className="px-6 py-4">{transaction?.transaction_hash.slice(0, 6)}..........{transaction?.transaction_hash.slice(-6)}</td>
                                                <td className="px-6 py-4">{transaction.amount ? transaction?.amount : "N/A"}</td>
                                                <td className="px-6 py-4 capitalize">{transaction?.type}</td>
                                                <td className='px-6 py-4 text-center'>
                                                    {
                                                        transaction?.asset_code ? transaction?.asset_code : "N/A"
                                                    }
                                                    {/* <img src="./images/Nigeria.svg" alt="" className='inline' />
                                                    <VscArrowSmallRight className='inline'/>
                                                    <img src="./images/Stellar.svg" alt="" className='inline' /> */}
                                                </td>
                                                {
                                                    transaction?.transaction_successful ? 
                                                    <td className="px-6 py-2 mt-3 rounded-full flex items-center text-[#41920D] bg-[#EDFFE2] gap-1">
                                                        <p className='p-1 rounded-full bg-[#41920D]'></p>
                                                        <p>Completed</p>
                                                    </td>
                                                    :
                                                    <td className="px-6 py-2 mt-3 rounded-full flex items-center text-[#344054] bg-[#F2F4F7]">
                                                        <PiArrowElbowUpLeftLight />
                                                        <p>Processing</p>
                                                    </td>
                                                }
                                                {/* <td className="px-6 py-4">
                                                    {new Date(transaction?.created_at).toDateString()}
                                                </td> */}
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Dashboard