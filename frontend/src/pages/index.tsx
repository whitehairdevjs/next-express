import React, { ChangeEvent, useState, useEffect } from 'react';
import { NextRouter, useRouter } from 'next/router';

//libs
import { Container, Input, Section, Spacing } from '@/_ui_libs/_index';
import { MQ } from '@/libs/themes/_index';

//components
import SEO from '@/seo.config';
import Comp1 from '@/libs/components/home/Comp1';
import Comp2 from '@/libs/components/home/Comp2';
import Comp3 from '@/libs/components/home/Comp3';
import Comp4 from '@/libs/components/home/Comp4';
import Comp5 from '@/libs/components/home/Comp5';

//
export default function Index() {
  const router: NextRouter = useRouter();
  const [isSearch, setIsSearch] = useState('');
  // useEffect(() => {
  //   console.log("occur effect.. ");
  // }, []);

  interface TestData {
    test: string;
  }

  const testData: TestData = {'test' : '테스트 데이타 입니다'};

  const handleButtonClick = async () => {
    // 버튼 클릭 시 URL 호출    
    try {
      const response = await fetch('http://localhost:3001/api/test/read', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          {
            test: '테스트내용',
            customQuery: 'select * from "test_info"'
          }
        ),
      });
      if (response.ok) {
        const data = await response.json();
        console.log('서버 응답:', data);
      } else {
        console.error('서버 응답 에러:', response.statusText);
      }
    } catch (error: any) {
      console.error('API 호출 에러:', error.message);
    }
  };

  return (
    <>
      <SEO />

      <Section>
        <Container
          maxWidth={560}
          padding={{ top: 40, bottom: 60, horizontal: 20 }}
          css={{ [MQ[3]]: { paddingTop: 10, paddingBottom: 40 } }}
        >
          <Input.SearchField
            shape="box"
            searchTab
            value={isSearch}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setIsSearch(e.target.value)}
            // onClick={() =>
            //   router.push({ query: { search: isSearch } }, undefined, { scroll: false })
            // }
            onClick={handleButtonClick}
          />

          <Spacing size={16} />
          <Comp1 data ={testData}/>
          {/* <Spacing size={12} />
          <Comp2 />
          <Spacing size={54} />
          <Comp3 />
          <Spacing size={44} />
          <Comp4 />
          <Spacing size={44} />
          <Comp5 /> */}
        </Container>
      </Section>
    </>
  );
}