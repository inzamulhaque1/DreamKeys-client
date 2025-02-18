import React, { useEffect } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';

const UserStats = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
// Fetch user reviews
  useEffect(() => {
    if (user) {
      axiosSecure
        .get(`/reviews/user/${user.uid}`)
        .then((response) => {
          setUserReviews(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user reviews:", error);
        });
    }
  }, [user, axiosSecure]);

// Fetch payment data for the user
  useEffect(() => {
    if (user) {
      axiosSecure
        .get(`/payments/${user?.email}`)
        .then((response) => {
          setPayments(response.data);
        })
        .catch((error) => {
          console.error("Error fetching payments:", error);
        });
    }
  }, [axiosSecure, user]);

    // Fetch bids data
    useEffect(() => {
      if (user) {
        axiosSecure
          .get(`/bids/${user?.email}`)
          .then((response) => {
            setBids(response.data);
          })
          .catch((error) => {
            console.error("Error fetching bids:", error);
          });
      }
    }, [axiosSecure, user]);

    return (
        <div>
            
        </div>
    );
};

export default UserStats;