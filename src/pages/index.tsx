import fetch from 'isomorphic-unfetch'
import Link from 'next/link'
import Layout from '../components/layout'
import { microCmsData } from '../types/microCmsData'

type Props = {
  dataList: Array<microCmsData>
}

const Index: React.FC<Props> = ({ dataList }) => {
  return (
    <Layout>
      <div className="grid l-grid-cols gap-4 mt-10 p-5">
        {dataList.map((dataList) => (
          <div
            className="min-w-full rounded overflow-hidden shadow-lg mr-6 mb-6"
            key={dataList.id}
          >
            <Link
              key={dataList.id}
              href="/spice_list/[id]"
              as={`spice_list/${dataList.id}`}
            >
              <a>
                <img
                  className="object-contain h-48 mt-0 mb-0 ml-auto mr-auto"
                  src={dataList.image.url}
                  alt=""
                />
              </a>
            </Link>
            <div className="px-6 py-4">
              <p className="font-bold text-xl mb-2">{dataList.name}</p>
              <div
                className="text-base line-clamp"
                dangerouslySetInnerHTML={{ __html: `${dataList.body}` }}
              ></div>
            </div>
            <div className="px-6 pt-4 pb-2">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                {dataList.tags[0].name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  )
}

export const getStaticProps = async () => {
  const key = {
    headers: { 'X-API-KEY': process.env.API_KEY as string },
  }

  const res = await fetch(process.env.ENDPOINT + '/spice_list', key)

  const data = await res.json()

  return {
    props: {
      dataList: data.contents,
    },
  }
}

export default Index
