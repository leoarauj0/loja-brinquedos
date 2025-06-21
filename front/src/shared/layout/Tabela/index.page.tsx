import { Empty, TableProps } from "antd";
import Column from "antd/es/table/Column";
import ColumnGroup from "antd/es/table/ColumnGroup";
import { RefTable } from "antd/es/table/interface";
import React from "react";
import Image from "next/image";

import boxempty from "@/assets/images/empty-box.png";

import { TabelaComponente } from "./styles";

export default function Tabela({ emptyTexto, ...rest }) {
  return (
    <TabelaComponente
      expandRowByClick
      {...rest}
      locale={{
        emptyText: (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            // image={
            //   <Image
            //     // className={styles.logo}
            //     src={boxempty}
            //     alt="Next.js Logo"
            //     width={100}
            //     height={37}
            //     priority
            //   />
            // }
            description={<span>{emptyTexto}</span>}
          />
        ),
      }}
    />
  );
}
