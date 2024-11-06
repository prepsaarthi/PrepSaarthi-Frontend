import React, { useState } from 'react';
import { Button, Box, Typography, Dialog, DialogContent, IconButton, CircularProgress } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const VideoLecture = () => {
  const [openModal, setOpenModal] = useState(false);
  const [subjectUrl, setSubjectUrl] = useState('');
  const [loading, setLoading] = useState(true);

  const handleOpenModal = (subject) => {
    let url = '';
    switch (subject) {
      case 'Physics':
        url = 'https://docs.google.com/spreadsheets/d/1x7aCU1JlMS4inOMTYTaDewxObFZhGsAj46KVRosH7yA/edit?gid=312629115#gid=312629115';
        break;
      case 'Chemistry':
        url = 'https://docs.google.com/spreadsheets/d/1hkWUalMGWVAcuTygQlrbumIkD8fXw2KSX818y29qTaI/edit?gid=2009746253#gid=2009746253';
        break;
      case 'Math':
        url = 'https://docs.google.com/spreadsheets/d/1I7oZOLzw-ww_F9EhMLZObmPs4rSMwrfmRi32AxD0WKE/edit?gid=0#gid=0';
        break;
      default:
        break;
    }
    setSubjectUrl(url);
    setLoading(true);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleIframeLoad = () => {
    setLoading(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        backgroundColor: '#f0f0f0',
        p: 2,
        // height: { xs: "480px", md: '338px' }
        maxHeight:{xs:'65vh', md:'45vh'}
      }}
    >
      <Box
        sx={{
          p: 4,
          backgroundColor: '#fff',
          boxShadow: 3,
          borderRadius: 2,
          textAlign: 'center',
          maxWidth: '400px',
          width: '100%',
          height: '60%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      >
        <Typography variant="h5" sx={{ mb: 2 }}>
          Video Lecture
        </Typography>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 2,
            flexDirection: { xs: 'column', sm: 'row' },
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpenModal('Physics')}
            sx={{
              width: { xs: '100%', sm: 'auto' },
            }}
          >
            Physics
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleOpenModal('Chemistry')}
            sx={{
              width: { xs: '100%', sm: 'auto' },
            }}
          >
            Chemistry
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => handleOpenModal('Math')}
            sx={{
              width: { xs: '100%', sm: 'auto' },
            }}
          >
            Math
          </Button>
        </Box>

        {/* Modal for Google Sheet */}
        <Dialog
          open={openModal}
          onClose={handleCloseModal}
          PaperProps={{
            sx: {
              width: '95vw',
              height: '95vh',
              m: 0, // Removes default margin
              maxWidth: 'none', // Prevents default max-width restriction
              maxHeight: 'none', // Prevents default max-height restriction
            },
          }}
        >
          <Box sx={{ position:'absolute',display: 'flex', justifyContent: 'flex-end', p: 1 ,zIndex:1111,cursor:'pointer'}}>
            <IconButton onClick={handleCloseModal}>
              <CloseIcon />
            </IconButton>
          </Box>
          <DialogContent sx={{ position: 'relative', height: '100%', p: 0 }}>
            {loading && (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  zIndex: 1,
                }}
              >
                <CircularProgress />
              </Box>
            )}
            <iframe
              src={subjectUrl}
              width="100%"
              height="100%"
              style={{ border: 'none', display: loading ? 'none' : 'block' }}
              onLoad={handleIframeLoad}
              title="Google Sheet"
            ></iframe>
          </DialogContent>
        </Dialog>
      </Box>
    </Box>
  );
};

export default VideoLecture;
