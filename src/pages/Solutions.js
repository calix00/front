import React from 'react';
import { Box, Typography, TextField } from '@mui/material';
import Slider from 'react-slick';
import Sidebar from '../components/Sidebar';
import TopNav from '../components/TopNav';
import 'slick-carousel/slick/slick.css'; // slick CSS
import 'slick-carousel/slick/slick-theme.css'; // slick theme CSS

function Problems() {
  // 슬라이더 설정
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 6, // 초기 화면에 보여질 슬라이드 수
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div style={{ display: 'flex' }}>
      {/* 사이드바 */}
      <Sidebar />

      <div style={{ flex: 1 }}>
        {/* 상단 네비게이션 바 */}
        <TopNav />

        <div style={{ backgroundColor: '#F3F6FE', minHeight: '91vh', paddingTop: '1px', display: 'flex', flexDirection: 'column' }}>
          {/* 슬라이더 컨테이너 */}
          <Box
           sx={{ maxWidth: '1200px', margin: '0 auto' }}>
            <Slider {...settings}>
              {Array.from({ length: 23 }).map((_, index) => (
                <Box
                  key={index}
                  sx={{
                    backgroundColor: 'white',
                    borderRadius: 3,
                    textAlign: 'center',
                    mx: 1, // 각 박스 사이 간격
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                    height: '110px', // 고정된 높이 설정
                    marginTop: '5px',
                  }}
                >
                  <Typography variant="h6">문제 {index + 18}</Typography>
                </Box>
              ))}
            </Slider>
          </Box>

          {/* 큰 흰색 박스 */}
          <Box
            sx={{
              flex: 1,
              backgroundColor: 'white',
              borderRadius: 3,
              textAlign: 'center',
              p: 1,
              mx: 2,
              my: 1,
              position: 'relative',
            }}
          >
            {/* 시험 문구와 버튼을 큰 박스에 직접 배치 */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mx: 2, my: 0 }}>
              <Typography variant="body1" sx={{ width: '30%', textAlign: 'left' }}>시험</Typography>
              <Typography variant="body1" sx={{ flex: 1, textAlign: 'left' }}>학습 시간:</Typography>
            </Box>

            {/* 시험 문제와 해설 영역 */}
            <Box
              sx={{
                marginTop: '0px',
                height: '67vh',
                display: 'flex',
                flexDirection: 'row',
                borderRadius: 3,
                overflow: 'hidden',
              }}
            >
              {/* 첫 번째 박스 */}
              <Box
                sx={{
                  flex: 1,
                  backgroundColor: '#e0e0e0',
                  borderRadius: '3px 0 0 3px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  p: 1,
                }}
              >
                <Typography variant="body1" sx={{ textAlign: 'center' }}>시험 문제</Typography>
                
                {/* 답 입력 박스 */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <TextField
                    variant="outlined"
                    placeholder="답을 입력하세요"
                    size="small"
                    sx={{ width: '150px' }}
                  />
                </Box>
              </Box>

              {/* 두 번째 박스 */}
              <Box
                sx={{
                  flex: 1,
                  backgroundColor: '#d0d0d0',
                  borderRadius: '0 3px 3px 0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="body1">해설</Typography>
              </Box>
            </Box>
          </Box>
        </div>
      </div>
    </div>
  );
}

export default Problems;
