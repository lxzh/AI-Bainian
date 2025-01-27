import { useState } from 'react'
import axios from 'axios'
import './App.css'
import OpenAI from 'openai'

function App() {
  const [self, setSelf] = useState('')
  const [recipient, setRecipient] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [greeting, setGreeting] = useState('')

  const openai = new OpenAI({
    baseURL: import.meta.env.VITE_OPENAI_API_URL,
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
  });

  const generateGreeting = async () => {
    if (!self.trim() || !recipient.trim()) {
      setError('温馨提示：请输入您的身份和拜年对象')
      return
    }

    setLoading(true)
    setError('')

    try {
      const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: "你是一个中英文语言高手，擅长撰写各种文案，也擅长使用emoji表情" },
          {
            role: 'user',
            content: `请为"${self}"给"${recipient}"生成一段拜年文案。`
          }
        ],
        model: "deepseek-chat",
      });

      const content = completion.choices[0].message.content
      console.log('Claude返回内容:', content)
      if (content === null) {
        throw new Error('文案内容格式不正确')
      }

      setGreeting(content)
    } catch (err) {
      console.error('Error generating greeting:', err)
      if (axios.isAxiosError(err)) {
        console.error('API Error Details:', {
          status: err.response?.status,
          statusText: err.response?.statusText,
          data: err.response?.data,
          headers: err.response?.headers,
          config: err.config
        })

        if (err.code === 'ECONNABORTED') {
          setError('请求超时，请检查网络连接后重试')
        } else if (err.response) {
          switch (err.response.status) {
            case 401:
              setError('API密钥无效，请联系管理员')
              break
            case 429:
              setError('请求过于频繁，请稍后再试')
              break
            case 500:
              setError('AI服务暂时不可用，请稍后重试')
              break
            default:
              const errorMessage = err.response.data?.error?.message || 
                                 err.response.data?.message || 
                                 err.response.statusText || 
                                 '未知错误'
              setError(`生成文案失败：${errorMessage}`)
              console.error('Detailed error response:', err.response.data)
          }
        } else if (err.request) {
          console.error('No response received:', err.request)
          setError('网络连接失败，请检查网络设置后重试')
        } else {
          console.error('Error details:', err.message)
          setError('生成文案失败，请稍后重试')
        }
      } else {
        console.error('Non-Axios error:', err)
        setError('生成文案时发生未知错误，请稍后重试')
      }
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = () => {
    if (greeting) {
      navigator.clipboard.writeText(greeting).then(() => {
        alert('文案已复制到剪切板！')
      }).catch(err => {
        console.error('Failed to copy text: ', err)
      })
    }
  }

  return (
    <div className="min-h-screen bg-red-100 py-12">
      <h1 className="text-4xl font-bold text-center mb-10 text-red-600">AI 拜年文案生成器</h1>
      
      <div className="max-w-3xl mx-auto px-4 space-y-12">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="space-y-4">
            <input
              type="text"
              value={self}
              onChange={(e) => setSelf(e.target.value)}
              placeholder="我是"
              className="w-full p-5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg"
            />
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="对谁"
              className="w-full p-5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg"
            />
          </div>
          <button
            onClick={generateGreeting}
            disabled={loading}
            className={`w-full mt-8 ${loading ? 'bg-red-200' : 'bg-red-400 hover:bg-red-500'} text-white font-bold py-4 px-12 rounded-xl transition-colors text-lg shadow-md`}
          >
            {loading ? '生成中...' : '生成拜年文案'}
          </button>
          {error && <p className="mt-4 text-red-500 text-sm">{error}</p>}
        </div>

        {greeting && (
          <div className="bg-yellow-100 text-red-600 px-8 py-16 rounded-xl shadow-lg text-2xl font-bold text-center">
            {greeting}
            <button
              onClick={copyToClipboard}
              className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors"
            >
              复制到剪切板
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
