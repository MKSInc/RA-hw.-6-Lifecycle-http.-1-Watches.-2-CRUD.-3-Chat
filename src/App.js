import Watches from './components/Watches';

export default function App() {
	return (
		<div className={'wrapper'}>
			<header className={'header'} id={'header'}>
				<div className={'header__body _container'}>
					<div className={'header__title'}>6. Домашнее задание к лекции «Жизненный цикл и работа с HTTP»</div>
				</div>
			</header>

			<main className={'main'}>
				<div className={'main__item task _container'} id={'task1'}>
					<header className={'task__header'}>
						<div className={'task__title'}>6.1. Мировые часы</div>
						<nav className={'task__menu menu'}>
							<div className={'menu__item'}>
								<a className={'menu__link menu__link-bottom'} href={'#task2'}>
									<span className={'_visually-hidden'}>next task</span>
								</a>
							</div>
						</nav>
					</header>
					<div className={'task__body'}>
						{/* Компонент задачи 1. */}
						<Watches />
					</div>
				</div>

				<div className={'main__item task _container'} id={'task2'}>
					<header className={'task__header'}>
						<div className={'task__title'}>6.2. CRUD</div>
						<nav className={'task__menu menu'}>
							<div className={'menu__item'}>
								<a className={'menu__link menu__link-top'} href={'#header'}>
									<span className={'_visually-hidden'}>previous task</span>
								</a>
							</div>
							<div className={'menu__item'}>
								<a className={'menu__link menu__link-bottom'} href={'#task3'}>
									<span className={'_visually-hidden'}>next task</span>
								</a>
							</div>
						</nav>
					</header>
					<div className={'task__body'}>
						{/* Компонент задачи 2. */}
					</div>
				</div>

				<div className={'main__item task _container'} id={'task3'}>
					<header className={'task__header'}>
						<div className={'task__title'}>6.3. Чат*</div>
						<nav className={'task__menu menu'}>
							<div className={'menu__item'}>
								<a className={'menu__link menu__link-top'} href={'#task2'}>
									<span className={'_visually-hidden'}>previous task</span>
								</a>
							</div>
						</nav>
					</header>
					<div className={'task__body'}>
						{/* Компонент задачи 3. */}
					</div>
				</div>
			</main>
		</div>
	);
}
