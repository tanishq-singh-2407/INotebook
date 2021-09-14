import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { NavbarContext, AuthContext } from 'src/imports/Context';
import 'src/styles/Home.css';

const Home = () => {
    const [time, setTime] = useState('');
    const { state, hide, show } = useContext(NavbarContext);
    const { getUser, user, greetings, quote, getEssentials } = useContext(AuthContext);
    const hide_show_btn = () => state.sign === '-' ? hide() : show()
    const history = useHistory();

    // eslint-disable-next-line
    useEffect(async () => {
        if (!localStorage.getItem('token')) {
            history.push('/login');
        }
        await getUser();
        await getEssentials();

        var t = new Date().toTimeString().toString().split(' ')[0].split('');
        setTime(`${t[0]}${t[1]}${t[2]}${t[3]}${t[4]}`);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    setInterval(() => {
        var t = new Date().toTimeString().toString().split(' ')[0].split('');
        setTime(`${t[0]}${t[1]}${t[2]}${t[3]}${t[4]}`);
    }, 60000);

    return (
        <>
            <section className='main_body__div'>
                <header className='inotebook__header'>
                    <section className='in_header__section' onClick={hide_show_btn}>INotebook</section>
                    <section className='in_header__section'></section>
                    <section className='in_header__section time'>
                        <i class="far fa-clock" style={{ fontSize: 'small' }}></i>&ensp;{time}
                    </section>
                </header>
                <section className='dashboard'>
                    <div className='dashboard_name'>
                        {greetings !== '' ? <h1>{greetings}, {user.name}</h1> : null}
                    </div>
                    {
                        quote.text ?
                            (window.innerWidth > 400 || quote.text.toString().length < 160) ?
                                <div className='dashboard_quote'>
                                    <h1>{quote.author} ~</h1>
                                    <span>{quote.text}!</span>
                                </div> : console.log("Word limit exceded for quote visibility.") : null
                    }
                    <div className='dashboard_statistic'>
                        <h1>Statistics</h1>
                        <div className='stats'>
                            <div className='particular_stat'>
                                <span>Total Words</span>
                                <h1>1230</h1>
                            </div>
                        </div>
                    </div>
                </section>
            </section>
        </>
    )
};

export default Home;