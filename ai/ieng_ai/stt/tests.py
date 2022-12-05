#@title Choose English ASR model { run: "auto" }



import string
from espnet_model_zoo.downloader import ModelDownloader
from espnet2.bin.asr_inference import Speech2Text
from base64 import b64decode
import librosa
import librosa.display
import matplotlib.pyplot as plt
import os
from IPython.display import display, Audio 







def ai(path):
  print("!!!!!!!!!!!!!!!!!!!!")
  tag = 'Shinji Watanabe/spgispeech_asr_train_asr_conformer6_n_fft512_hop_length256_raw_en_unnorm_bpe5000_valid.acc.ave' #@param ["Shinji Watanabe/spgispeech_asr_train_asr_conformer6_n_fft512_hop_length256_raw_en_unnorm_bpe5000_valid.acc.ave", "kamo-naoyuki/librispeech_asr_train_asr_conformer6_n_fft512_hop_length256_raw_en_bpe5000_scheduler_confwarmup_steps40000_optim_conflr0.0025_sp_valid.acc.ave"] {type:"string"}
  d = ModelDownloader()
# It may takes a while to download and build models
  speech2text = Speech2Text(
    **d.download_and_unpack(tag),
    # device="cuda",
    minlenratio=0.0,
    maxlenratio=0.0,
    ctc_weight=0.3,
    beam_size=10,
    batch_size=0,
    nbest=1
  ) 
  RECORD = """
  const sleep = time => new Promise(resolve => setTimeout(resolve, time))
  const b2text = blob => new Promise(resolve => {
    const reader = new FileReader()
    reader.onloadend = e => resolve(e.srcElement.result)
    reader.readAsDataURL(blob)
  })
  var record = time => new Promise(async resolve => {
    stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    recorder = new MediaRecorder(stream)
    chunks = []
    recorder.ondataavailable = e => chunks.push(e.data)
    recorder.start()
    await sleep(time)
    recorder.onstop = async ()=>{
      blob = new Blob(chunks)
      text = await b2text(blob)
      resolve(text)
    }
    recorder.stop()
  })
  """


  scriptpath = os.path.dirname(__file__)
  VOICE_FILE_LOCATION = os.path.join(scriptpath, '../media/'+path)
  audio = VOICE_FILE_LOCATION
  # second = 5
  # print(f"Speak to your microphone {second} sec...")
  # record(second, audio)
  # print("Done!")

  speech, rate = librosa.load(audio, sr=16000)
  # librosa.display.waveplot(speech, sr=rate)


  plt.show()

  # import pysndfile
  # pysndfile.sndio.write('audio_ds.wav', speech, rate=rate, format='wav', enc='pcm16')

  display(Audio(speech, rate=rate))

  nbests = speech2text(speech)
  text, *_ = nbests[0]
 
  text = text.upper()
  text = text.translate(str.maketrans('', '', string.punctuation))
  print(text)
  return text
    

