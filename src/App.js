import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Header from './pages/Header';
import Side from './pages/Side';
import MyComp1 from './pages/MyComp1'
import PageNotFound from './pages/PageNotFound'
import { Container, Row, Col } from 'react-bootstrap';
import UserDetail from './components/UserDetail'
import BoardList from './components/BoardList'
import LifeCycle from './components/LifeCycle'
import UseEffectHook from './components/UseEffectHook';
import Clock from './components/Clock'
import UseRefHook from './components/UseRefHook'
import AppPropsDrill from './components/context_api/AppPropsDrill'
import AppCtx from './components/context_api/AppCtx'
import AppCtx2 from './components/context_api/App'
import UseMemoHook from './components/UseMemoHook'
import UseCallbackHook from './components/UseCallbackHook'
import ReactMemo from './components/ReactMemo'
import TodoApp from './components/todo/TodoApp'
import SingleUser from './components/ajax/SingleUser'
import ListUser from './components/ajax/ListUser'
import OpenWeather from './components/ajax/OpenWeather'
import NaverBookApp from './components/naverBook/NaverBookApp'
import SignUp from './components/member/SignUp'
import MemberList from './components/member/MemberList'
import LoginForm from './components/member/LoginForm'
import {LoginUserProvider} from './components/member/LoginUserContext'
import BoardApp from './components/board/BoardApp'
import BoardView from './components/board/BoardView'
import BoardModify from './components/board/BoardModify'
// 로그인한 회원정보를 제공할 Context

function App() {
  return (
    <LoginUserProvider>
      <div className="container py-4">
        <BrowserRouter>
          <Container>
            {/* Header */}
            <Row>
              <Col xs={12}>
                <Header />
              </Col>
            </Row>
            <Row>
              <Col xs={12} sm={3} md={3} className="d-none d-sm-block">
                <Side/>
              </Col>
              <Col xs={12} sm={9} md={9}>
                <Routes>
                  <Route path="/" element={<Home/>} />
                  <Route path="/comp1" element={<MyComp1/>}/>                
                  <Route path="/users/:id" element={<UserDetail/>}/>
                  <Route path="/board" element={<BoardList/>}/>
                  <Route path="/life" element={<LifeCycle/>}/>
                  <Route path="/hook1" element={<UseEffectHook/>}/>
                  <Route path="/clock" element={<Clock/>}/>
                  <Route path="/hook2" element={<UseRefHook/>} />
                  <Route path="/app2" element={<AppPropsDrill/>} />
                  <Route path="/hook3" element={<AppCtx/>} />
                  <Route path="/hook4" element={<AppCtx2/>} />
                  <Route path="/hook5" element={<UseMemoHook/>}  />
                  <Route path="/hook6" element={<UseCallbackHook/>}  />
                  <Route path="/memo" element={<ReactMemo/>}  />
                  <Route path="/todo" element={<TodoApp/>}  />
                  <Route path="/ajax1/:id" element={<SingleUser/>}  />
                  <Route path="/ajax2" element={<ListUser/>}  />
                  <Route path="/ajax3" element={<OpenWeather/>}  />
                  <Route path="/naver" element={<NaverBookApp/>}  />
                  <Route path="/signup" element={<SignUp/>}  />
                  <Route path="/members" element={<MemberList/>}  />
                  <Route path="/login" element={<LoginForm/>}  />
                  <Route path="/post" element={<BoardApp/>}  />
                  <Route path="/post/:id" element={<BoardView/>}  />
                  <Route path="/postEdit/:id" element={<BoardModify/>}  />
                  <Route path="*"   element={<PageNotFound/>}/>
                </Routes>

              </Col>
            </Row>
          </Container>
        </BrowserRouter>
      </div>
    </LoginUserProvider>
  );
}

export default App;