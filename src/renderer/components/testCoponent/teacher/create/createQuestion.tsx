import { useState } from 'react'
import { Button, Flex, Form, Modal, Select, Splitter, Input, message } from 'antd'
import ChoiceItem from './Choices'
import { createOption } from './create'
import RichTextEditor from './RichEditor'
import { uploadQuestion } from '@renderer/api/teacher/questionBank'
interface Choice {
  ansContent: string
  isRight: number
}
interface quillRich {
  value: string
  json: string
}
function CreateQuestion(): JSX.Element {
  // 选择选项的自定义处理函数
  const [choices, setChoices] = useState<Choice[]>([
    {
      ansContent: '选项',
      isRight: 0
    },
    {
      ansContent: '选项',
      isRight: 0
    },
    {
      ansContent: '选项',
      isRight: 0
    },
    {
      ansContent: '选项',
      isRight: 0
    }
  ])
  const [enableEditor, setenableEditor] = useState<{ itemContent: quillRich; analysis: quillRich }>(
    {
      itemContent: { value: '', json: '' },
      analysis: { value: '', json: '' }
    }
  )
  // 编辑题目的富文本
  const handleEditor = (type: string, value: string) => {
    setenableEditor((prev) => ({
      ...prev,
      [type]: { ...prev[type], value }
    }))
  }
  const [questionType, setQuestionType] = useState<string>('0')
  const handleChange = (value: string) => {
    setQuestionType(value)
    setChoices(createOption(value))
  }
  const handleCardClick = (index: number) => {
    setChoices((prevChoices) =>
      prevChoices.map((choice, i) => {
        if (questionType === '0') {
          // 单选题：确保只有一个正确选项
          return { ...choice, isRight: i === index ? 1 : 0 }
        } else if (questionType === '1') {
          // 多选题：切换当前选项的正确状态
          return { ...choice, isRight: i === index ? 1 - choice.isRight : choice.isRight }
        }
        return choice
      })
    )
  }

  const handleCardEdit = (index: number, value: string) => {
    setChoices((prevChoices) => {
      const updatedChoices = [...prevChoices] // 创建新的数组副本
      updatedChoices[index] = { ...updatedChoices[index], ansContent: value } // 更新指定索引的元素
      return updatedChoices
    })
  }
  const handleAdd = (index: number) => {
    // 最多10个选项
    if (choices.length >= 10) {
      message.warning('一道选择题最多拥有10个选项')
    } else {
      setChoices((prevChoices) => {
        const updatedChoices = [
          ...prevChoices.slice(0, index + 1),
          { ansContent: '选项', isRight: 0 }, // 新的空选项
          ...prevChoices.slice(index + 1)
        ]
        return updatedChoices
      })
    }
  }
  const [difficulty, setDifficulty] = useState<string>('0')
  const handleDifficult = (value: string) => {
    setDifficulty(value)
  }
  const [bankName, setbankName] = useState<string>('')
  const handlebankName = (e: any) => {
    setbankName(e.target.value)
  }
  const handleJSON = (type: string, value: string) => {
    setenableEditor((prev) => ({
      ...prev,
      [type]: { ...prev[type], json: value } // 直接更新 JSON 数据
    }))
  }

  const [open, setOpen] = useState(false)

  const showModal = () => {
    setOpen(true)
  }

  const handleOk = async () => {
    const data = {
      questionAnalysis: enableEditor.analysis.value,
      questionContent: enableEditor.itemContent.value,
      questionSubject: bankName,
      questionLevel: Number(difficulty),
      questionType: Number(questionType),
      ansList: choices
    }

    try {
      const response = await uploadQuestion(data)
      console.log('提交成功:', response)
      message.success('题目添加成功！')
    } catch (error) {
      console.error('提交失败:', error)
      message.error('题目添加失败！')
    } finally {
      setOpen(false)
    }
  }

  const handleCancel = () => {
    setOpen(false)
  }

  return (
    <>
      <Button type="primary" onClick={showModal}>
        添加题目
      </Button>
      <Modal width={900} open={open} onOk={handleOk} onCancel={handleCancel}>
        <div className="createQuestion ">
          <Flex gap={20}>
            <Form.Item label="选择题型">
              <Select
                style={{ width: '120px' }}
                defaultValue={'0'}
                onChange={handleChange}
                options={[
                  { value: '0', label: '单选' },
                  { value: '1', label: '多选' },
                  { value: '2', label: '判断' },
                  { value: '3', label: '简答' }
                ]}
              />
            </Form.Item>
            <Form.Item label="题目难度" name="difficulty">
              <Select
                style={{ width: '120px' }}
                defaultValue={'0'}
                onChange={handleDifficult}
                options={[
                  { value: '0', label: '简单' },
                  { value: '1', label: '中等' },
                  { value: '2', label: '困难' }
                ]}
              />
            </Form.Item>
            <Form.Item label="题库名称">
              <Input
                placeholder="要添加的题库名称/新建题库..."
                onChange={handlebankName}
                style={{ width: '240px' }}
              />
            </Form.Item>
          </Flex>
          <div className="max-h-96 overflow-auto srollBar">
            <Splitter className="h-[650px] bg-slate-100 p-2" layout="vertical">
              <Splitter.Panel defaultSize="50%" min="50%" max="50%">
                <Splitter layout="horizontal" className="pr-2">
                  <Splitter.Panel defaultSize="55%" min="50%" max="60%" className="noSrollBar">
                    <div>
                      <div className="max-h-[310px] relative overflow-hidden">
                        <div className="relative">
                          <RichTextEditor
                            value={enableEditor.itemContent.value}
                            onChange={(value) => handleEditor('itemContent', value)}
                            getJSON={(value: string) => handleJSON('itemContent', value)}
                          />
                        </div>
                      </div>
                    </div>
                  </Splitter.Panel>
                  {choices.length && (
                    <Splitter.Panel collapsible className="noSrollBar">
                      <div>
                        <div className="max-h-[350px] pl-2">
                          <div className="chioces flex flex-col gap-2 justify-between max-h-[350px]">
                            {choices.map((items, index) => (
                              <ChoiceItem
                                key={index}
                                questionType={questionType}
                                items={items}
                                index={index}
                                onClick={handleCardClick}
                                onEdit={handleCardEdit}
                                onAdd={handleAdd}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </Splitter.Panel>
                  )}
                </Splitter>
              </Splitter.Panel>
              <Splitter.Panel>
                <div>
                  <div className="max-h-[300px] pt-2 relative overflow-hidden">
                    <div className="relative BCE">
                      <RichTextEditor
                        value={enableEditor.analysis.value}
                        onChange={(value) => handleEditor('analysis', value)}
                        getJSON={(value: string) => handleJSON('analysis', value)}
                      />
                    </div>
                  </div>
                </div>
              </Splitter.Panel>
            </Splitter>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default CreateQuestion
