import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getCategory } from '../../../redux/actions/categoryActions';
import { ChevronRight, Home } from 'lucide-react';

function Breadcrumbs() {
    const { categoryId } = useParams();
    const dispatch = useDispatch();
    const { category, loading } = useSelector(state => state.category);

    useEffect(() => {
        if (categoryId) {
            dispatch(getCategory(categoryId));
        }
    }, [dispatch, categoryId]);

    const generateBreadcrumbs = (currentCategory, path = []) => {
        if (!currentCategory) return path;

        const updatedPath = [{
            name: currentCategory.name,
            link: `/category/${currentCategory._id}`
        }, ...path];

        if (currentCategory.parent) {
            return generateBreadcrumbs(currentCategory.parent, updatedPath);
        } else {
            return updatedPath;
        }
    };

    const breadcrumbPath = category ? generateBreadcrumbs(category) : [];

    return (
        <nav className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-neutral-400 mb-8 overflow-x-auto whitespace-nowrap pb-2 scrollbar-hide">
            <Link to="/" className="flex items-center gap-1.5 hover:text-primary-600 transition-colors">
                <Home size={14} />
                <span>Home</span>
            </Link>

            <ChevronRight size={14} className="text-neutral-300 shrink-0" />

            <Link to="/categories" className="hover:text-primary-600 transition-colors">
                Categories
            </Link>

            {!loading && breadcrumbPath.map((crumb, index) => (
                <React.Fragment key={index}>
                    <ChevronRight size={14} className="text-neutral-300 shrink-0" />
                    <Link
                        to={crumb.link}
                        className={`transition-colors ${index === breadcrumbPath.length - 1
                            ? 'text-neutral-900 cursor-default pointer-events-none'
                            : 'hover:text-primary-600'
                            }`}
                    >
                        {crumb.name}
                    </Link>
                </React.Fragment>
            ))}
        </nav>
    );
}

export default Breadcrumbs;